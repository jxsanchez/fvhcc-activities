import React from 'react';

const GameHeader = (props) => {
    return (
        <div className='game-info-container'>
            <h1 className='game-title'>{props.title}</h1>

            {props.children}
        </div>
    );
}

export default GameHeader;