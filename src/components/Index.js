import React from 'react';
import { Link } from 'react-router-dom';

import Section from './Section';
import GameInfo from './GameInfo';
import Button from './Button';

class Index extends React.Component {
    getLetters() {
        const letters = [];

        for(let i = 65; i <= 90; i++) {
            letters.push(String.fromCharCode(i));
        }

        return letters;
    }

    render() {
        return (
            <div>
                <Section 
                        id='landing' 
                        title='Freedom Village Health Care Center Activities'
                        subtitle='Games to stimulate the mind'
                    >
                        <Button href='#games' className='button' text='See Games' />
                    </Section>

                    <Section 
                        id='games' 
                        title='Games'
                        subtitle='Browse our collection of games.'
                    >
                        <GameInfo 
                            title='Mystery Word Game'
                            description='Guess the mystery word before you run out of guesses!'
                        >
                            <Link to='/mysteryword' className='button'>Play</Link>
                        </GameInfo>
                    </Section>
                </div>
        );
    }
}

export default Index;