import React from 'react';

function Square({ clickedArray, handleClick }) {
	return (
		<div className="board">
			{clickedArray.map((item, index) => (
				<div 
					key={index} 
					className={`square ${item !== "" ? "clicked" : ""}`}
					onClick={item === "" ? () => handleClick(index) : undefined}
					style={{
						color: item === "X" ? 'blue' : item === "O" ? 'red' : 'black', 
						fontWeight: 800,
					}}
				>
					{item}
				</div>
			))}
		</div>
	);
}

export default Square;
