import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const ResultsArea = (props) => {
    const playAgain = () => {
        props.playAgain();
    }

    return (
        <div className='results-area'>
            <h3 className={`results-title ${props.result}`}>{props.title}</h3>

            <p className='results-message'>{props.message}</p>

            <div className='options'>
                <Button href='/mysteryword' className='button button-outline-blue' text='Play Again' onClick={playAgain} />
                <Link className='button' to='/'>Quit</Link>
            </div>
        </div>
    );
}

export default ResultsArea;