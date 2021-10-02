import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

function Team(props) {
	const { item, text, gameStatus } = props;
	
	const logoSrc = `/${item.teamInfo.abbr}.png`
	const metaStyle = gameStatus == "In Progress" 
		? { 'fontSize': "13px", 'marginTop': '4px', 'textAlign': 'center', 'color': 'green'} 
		: { 'textAlign': 'center', 'marginTop': '2px' };

	return (
		<Container style={{ 'margin': '5px', 'padding': '0px' }}>
		<Row>
			<Col md={1}>
				{/*<div 
					className='team-color'
					style={{ 'backgroundColor': `#${item.teamInfo.color}` }}>
				</div>*/}
				<img src={logoSrc} className='logo'/>
			</Col>
			<Col md={5} className='team-name'>{item.teamInfo.name}</Col>
			<Col md={1} className='float-right team-score'>{gameStatus !== "Scheduled" ? item.score : ""}</Col>
			<Col md={4} style={metaStyle}>{text}</Col>
		</Row>
		</Container>
	);
}

export default Team;
