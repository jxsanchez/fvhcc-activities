import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const ResultsArea = (props) => {
    const playAgain = (e) => {
        e.preventDefault();

        props.onClick();
    }

    return (
        <div className='results-area'>
            <h3 className={`results-title ${props.result}`}>{props.title}</h3>

            <p className='results-message'>{props.message}</p>

            <div className='options'>
                <a href='' className='button button-outline-blue' onClick={e => {playAgain(e)}}>Play Again</a>
                {/* <Button className='button button-outline-blue' text='Play Again' onClick={playAgain} /> */}
                <Link className='button' to='/'>Quit</Link>
            </div>
        </div>
    );
}

export default ResultsArea;