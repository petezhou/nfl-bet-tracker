import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'


function Bet(props) {
	const { bet } = props;

	const moneyLine = bet.spread == 0 ? "(Moneyline)" : "";
	let spreadVal = "";
	if (bet.spread > 0) {
		spreadVal = "+" + bet.spread.toString()
	} else if (bet.spread < 0) {
		spreadVal = bet.spread.toString();
	}

	return (
		<div style={{ 'marginTop': '10px' }}>
			<p>{bet.gameValue} {moneyLine}</p>
			<p style={{ 'fontWeight': 'bold', 'marginTop': '-17px' }}>{bet.teamSelection} {spreadVal}</p>
		</div>
	);
}

function CreationBetList(props) {

	return (
		<div style={{'minHeight': '100px'}}>
			{ props.bets.map((item, idx) => (<Bet key={idx} bet={item}/>)) }
		</div>
	);
}

export default CreationBetList;
