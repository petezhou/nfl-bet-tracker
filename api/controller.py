import time
from flask import Flask
import requests
import json
from model.teamInfo import TeamInfo
from model.team import Team
from model.game import Game

app = Flask(__name__)

@app.route('/time')
def get_current_time():
	return {'time': time.time()}

@app.route('/getAllScores')
def get_all_scores():
	return fetchLiveScoresFromESPN()
	

# Private Helpers #

def fetchLiveScoresFromESPN():
	res = requests.get('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard')
	resObj = json.loads(res.text)
	allScores = {}
	for i in range(len(resObj['events'])):
		homeCity = resObj['events'][i]['competitions'][0]['competitors'][0]['team']['location']
		homeName = resObj['events'][i]['competitions'][0]['competitors'][0]['team']['shortDisplayName']
		homeAbbr = resObj['events'][i]['competitions'][0]['competitors'][0]['team']['abbreviation']
		homeColor = resObj['events'][i]['competitions'][0]['competitors'][0]['team']['color']
		homeRecord = resObj['events'][i]['competitions'][0]['competitors'][0]['records'][0]['summary']
		homeTeamInfo = TeamInfo(homeCity, homeName, homeAbbr, homeColor, homeRecord)
		homeScore = resObj['events'][i]['competitions'][0]['competitors'][0]['score']
		homeTeam = Team(homeTeamInfo, homeScore, True)

		awayCity = resObj['events'][i]['competitions'][0]['competitors'][1]['team']['location']
		awayName = resObj['events'][i]['competitions'][0]['competitors'][1]['team']['shortDisplayName']
		awayAbbr = resObj['events'][i]['competitions'][0]['competitors'][1]['team']['abbreviation']
		awayColor = resObj['events'][i]['competitions'][0]['competitors'][1]['team']['color']
		awayRecord = resObj['events'][i]['competitions'][0]['competitors'][1]['records'][0]['summary']
		awayTeamInfo = TeamInfo(awayCity, awayName, awayAbbr, awayColor, awayRecord)
		awayScore = resObj['events'][i]['competitions'][0]['competitors'][1]['score']
		awayTeam = Team(awayTeamInfo, awayScore, False)

		game = Game(homeTeam, awayTeam)
		allScores[homeAbbr] = json.dumps(game, default=lambda o: o.__dict__, indent=4)

	return allScores

