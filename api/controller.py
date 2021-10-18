import time
from flask import Flask, request
import requests
import json
import datetime
import time
from model.teamInfo import TeamInfo
from model.team import Team
from model.game import Game

app = Flask(__name__)

db = []
scores_data = {}

@app.route('/time')
def get_current_time():
	return {'time': time.time()}

@app.route('/getAllScores')
def get_all_scores():
	return fetchLiveScoresFromESPN()
	
@app.route('/postBets', methods = ['POST'])
def post_bets():
	db.append(request.json);
	return {'Status Code': '200'}

@app.route('/getBetsByUser')
def get_bets_by_user():
	res = []
	for entry in db:
		userBet = {}
		# TODO: add stuff like isWinningBet(), possible payout, etc.
		res.append(userBet);
	#TODO: put net profits so far at the top level here
	return {'data': res};



# Private Helpers #

def fetchLiveScoresFromESPN():
	res = requests.get('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard')
	resObj = json.loads(res.text)
	scoresObject = {}
	allScores = []
	for i in range(len(resObj['events'])):
		homeDisplayName = resObj['events'][i]['competitions'][0]['competitors'][0]['team']['displayName']
		homeCity = resObj['events'][i]['competitions'][0]['competitors'][0]['team']['location']
		homeName = resObj['events'][i]['competitions'][0]['competitors'][0]['team']['shortDisplayName']
		homeAbbr = resObj['events'][i]['competitions'][0]['competitors'][0]['team']['abbreviation']
		homeColor = resObj['events'][i]['competitions'][0]['competitors'][0]['team']['color']
		homeRecord = resObj['events'][i]['competitions'][0]['competitors'][0]['records'][0]['summary']
		homeTeamInfo = TeamInfo(homeDisplayName, homeCity, homeName, homeAbbr, homeColor, homeRecord)
		homeScore = resObj['events'][i]['competitions'][0]['competitors'][0]['score']
		homeTeam = Team(homeTeamInfo, homeScore, True)

		awayDisplayName = resObj['events'][i]['competitions'][0]['competitors'][1]['team']['displayName']
		awayCity = resObj['events'][i]['competitions'][0]['competitors'][1]['team']['location']
		awayName = resObj['events'][i]['competitions'][0]['competitors'][1]['team']['shortDisplayName']
		awayAbbr = resObj['events'][i]['competitions'][0]['competitors'][1]['team']['abbreviation']
		awayColor = resObj['events'][i]['competitions'][0]['competitors'][1]['team']['color']
		awayRecord = resObj['events'][i]['competitions'][0]['competitors'][1]['records'][0]['summary']
		awayTeamInfo = TeamInfo(awayDisplayName, awayCity, awayName, awayAbbr, awayColor, awayRecord)
		awayScore = resObj['events'][i]['competitions'][0]['competitors'][1]['score']
		awayTeam = Team(awayTeamInfo, awayScore, False)

		eventName = resObj['events'][i]['name']
		date = resObj['events'][i]['date']
		timestamp = time.mktime(datetime.datetime.strptime(date, "%Y-%m-%dT%H:%MZ").timetuple())
		gameStatus = resObj['events'][i]['status']['type']['description']
		gameClock = resObj['events'][i]['status']['displayClock']
		quarter = resObj['events'][i]['status']['period']
		game = Game(eventName, homeTeam, awayTeam, gameStatus, timestamp, gameClock, quarter)

		scoresObject[eventName] = json.dumps(game, default=lambda o: o.__dict__, indent=4)
		allScores.append(game)

	scores_data = scoresObject
	allScores.sort(key=lambda x: x.date)
	return json.dumps(allScores, default=lambda o: o.__dict__, indent=4)


def isWinningBet(bet):
	pass



