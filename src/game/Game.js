import React, { useState, useEffect } from 'react';
import Team from './Team'

function Game(props) {
	const { item } = props;
		console.log(item)
	return (
		<div className="display-game">
			<Team item={item.home} />
			<Team item={item.away} />
		</div>
	);
}

export default Game;
