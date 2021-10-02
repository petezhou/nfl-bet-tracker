import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

function Team(props) {
	const { item } = props;
		console.log(item)
	return (
		<Container style={{ 'margin': '5px', 'padding': '0px' }}>
		<Row>
			<Col md={1}>
				<div 
					className='team-color'
					style={{ 'backgroundColor': `#${item.teamInfo.color}` }}>
				</div>
			</Col>
			<Col md={7}>{item.teamInfo.name}</Col>
			<Col md={1} className='float-right'>{item.score}</Col>
		</Row>
		</Container>
	);
}

export default Team;
