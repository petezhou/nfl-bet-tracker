import React, { useState, useEffect } from 'react';
import Team from './Team'

function Game(props) {
	const { item } = props;

	let topText = "";
	let bottomText = "";
	let isLive = false;


	// before the game
	if (item.gameStatus === "Scheduled") {
		const date = new Date((item.date - 14400) * 1000 );
		topText = `${date.toLocaleString('default', { month: 'short'})} ${date.getDate()}`
		bottomText = `${date.getHours() % 12}:${date.getMinutes()<10?'0':''}${date.getMinutes()} PM`
	} else if (item.gameStatus === "Final") {
		topText = "Final"
	} else {
		topText = "Live"
		bottomText = `${item.gameClock} Q${item.quarter}`
		isLive = true;
	}
 
	return (
		<div className='display-game'>
			<Team item={item.home} text={topText} gameStatus={item.gameStatus}/>
			<Team item={item.away} text={bottomText} gameStatus={item.gameStatus}/>
		</div>
	);
}

export default Game;
