import React, { useState, useEffect } from 'react';
import "react-widgets/styles.css";
import { 
	Container, Row, Button,
	Modal, Col, FormControl
} from 'react-bootstrap/'
import { DropdownList, NumberPicker } from "react-widgets";


function MyBets(props) {

	const [show, setShow] = useState(false);

	const [gameValue, setGameValue] = useState(props.validGames[0].name)
	const [teamChoices, setTeamChoices] = useState(findTeams(props.validGames[0].name, props.validGames))
	const [teamSelection, setTeamSelection] = useState(props.validGames[0].home.teamInfo.displayName)
	const [spread, setSpread] = useState(0)

	const [betList, setBetList] = useState([])
	const [odds, setOdds] = useState(0)
	const [stake, setStake] = useState(0)
 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
  	console.log(gameValue + " -> " + teamSelection + " " + spread)  // submit
  	setShow(false);
  };

  const handleAddBet = () => {
  	const bet = {
  		gameValue,
  		teamSelection,
  		spread
  	}
  	setBetList([...betList, bet])
  }

  const handleGameChangeSelect = (value) => {
  	setGameValue(value);
  	const teams = findTeams(value, props.validGames)
  	setTeamChoices(teams);
  	setTeamSelection(teams[0]);
  }


	const renderModal = () => {
		const { validGames } = props;
		return (
			<Modal show={show} onHide={handleClose} size='lg'>
				<Modal.Body>
					<Row>
		  			<Col md={2}>
			  			<h5>Matchup</h5>
			  		</Col>
			  		<Col md={10}>
							<DropdownList
				  			defaultValue={gameValue}
				  			data={validGames.map(game => game.name)}
				  			onChange={handleGameChangeSelect}
				  			style={{'width': '500px'}}
							/>
						</Col>
					</Row>
					<Row>
						<Col md={1}>Select</Col>
						<Col md={4}>
							<DropdownList
								style={{'width': '240px'}}
				  			value={teamSelection}
				  			data={teamChoices}
				  			onChange={setTeamSelection}
							/>
						</Col>
						<Col md={1}>Spread</Col>
						<Col md={2}>
							<FormControl type="number" defaultValue={0} onChange={(e) => setSpread(e.target.value)}/>			
						</Col>
						<Col md={2}>
							<Button onClick={handleAddBet} variant="success">Add Bet</Button>
						</Col>
					</Row>
					<Row>
						<hr style={{"marginTop": "15px"}}/>
					</Row>
					<Row>
						<h5>Bet Card</h5>
						<div style={{'minHeight': '100px'}}>
						</div>
					</Row>
					<Row>
						<hr />
					</Row>
					<Row>
						<Col md={1}>Odds</Col>
						<Col md={2}>
							<FormControl type="number" defaultValue={0} onChange={(e) => setOdds(e.target.value)}/>	
						</Col>
						<Col md={1}>Stake</Col>
						<Col md={2}>
							<FormControl type="number" defaultValue={0} onChange={(e) => setStake(e.target.value)}/>	
						</Col>
						<Col>
							<Button onClick={handleSave}>Save</Button>
						</Col>
					</Row>
				</Modal.Body>
			</Modal>
		)
	}

	console.log(betList);
	return (
		<div className='betsRoot'>
			<Button style={{'marginRight': '5px'}} onClick={handleShow}>Create Bet</Button>
			<Button variant="secondary">Import Bets</Button>
			{renderModal()}
		</div>
		);
}

function findTeams(game, list) {
	for (let i = 0; i < list.length; i++) {
		if (list[i].name === game) {
			return [list[i].home.teamInfo.displayName, list[i].away.teamInfo.displayName]
		}
	}
	return ["",""]
}

export default MyBets;
