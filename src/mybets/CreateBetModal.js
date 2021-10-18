import React, { useState, useEffect } from 'react';
import axios from 'axios'
import "react-widgets/styles.css";
import { 
	Container, Row, Button,
	Modal, Col, FormControl
} from 'react-bootstrap/'
import { DropdownList, NumberPicker } from "react-widgets";
import CreationBetList from './CreationBetList'


function CreateBetModal(props) {

	const [show, setShow] = useState(false);

	const [gameValue, setGameValue] = useState(props.validGames[0].name)
	const [teamChoices, setTeamChoices] = useState(findTeams(props.validGames[0].name, props.validGames))
	const [teamSelection, setTeamSelection] = useState(props.validGames[0].home.teamInfo.displayName)
	const [spread, setSpread] = useState(0)

	const [betList, setBetList] = useState([]);
	const [odds, setOdds] = useState(0);
	const [stake, setStake] = useState(0);
 
  const handleShow = () => setShow(true);

  const handleClose = () =>{ 
  	setBetList([]);
  	setSpread(0);
  	setOdds(0);
  	setStake(0);
  	setShow(false);
  }
  
  const handleSave = () => {
  	const betCard = {
  		betList,
  		odds,
  		stake
  	}
  	axios.post(`/postBets`, { betCard })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

  	console.log(betCard);
  	handleClose();
  };

  const handleAddBet = () => {
  	const bet = {
  		gameValue,
  		teamSelection,
  		spread
  	}
  	setBetList([...betList, bet]);
  }

  const handleGameChangeSelect = (value) => {
  	setGameValue(value);
  	const teams = findTeams(value, props.validGames)
  	setTeamChoices(teams);
  	setTeamSelection(teams[0]);
  }

  const renderManualCreateModal = () => {
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
						<CreationBetList bets={betList}/>
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
  	);
  }

	return (
		<div className='betsRoot'>
			<Button style={{'marginRight': '5px'}} onClick={handleShow}>Create Bet</Button>
			<Button variant="secondary" disabled>Import Bets</Button>
			{ renderManualCreateModal() }
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

export default CreateBetModal;
