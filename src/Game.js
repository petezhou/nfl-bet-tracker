import React, { useState, useEffect } from 'react';

function Game(props) {
	const { item } = props;
		console.log(item)
	return (
		<div style={{ 'border-style': 'solid', 'margin': '5px', 'width': '300px' }}>
			<p>{item.home.teamInfo.abbr}: {item.home.score}</p>
			<p>{item.away.teamInfo.abbr}: {item.away.score}</p>
		</div>
	);
}

export default Game;