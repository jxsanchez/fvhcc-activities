import React from 'react';

const GameArea = (props) => {
    return (
        <div className='game-area'>
            {props.children}
        </div>
    );
}

export default GameArea;