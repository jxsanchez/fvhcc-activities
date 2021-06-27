import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';

const ResultsArea = (props) => {
    return (
        <div>
            <h3>{props.message}</h3>

            {props.solution ? <p>{props.solution}</p> : ''}

            <Button href='/mysteryword' text='Play Again' />
            <Link className='button' to='/'>Quit</Link>
        </div>
    );
}

export default ResultsArea;