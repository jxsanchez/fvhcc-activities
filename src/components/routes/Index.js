import React from 'react';
import { Link } from 'react-router-dom';

import Nav from '../Nav';
import Section from '../Section';
import GameInfo from '../GameInfo';
import Button from '../Button';
import Footer from '../Footer';

class Index extends React.Component {
    getLetters() {
        const letters = [];

        for(let i = 65; i <= 90; i++) {
            letters.push(String.fromCharCode(i));
        }

        return letters;
    }

    componentDidMount() {
        document.title = "Home | FVHCC Activities";
    }

    render() {
        return (
            <div>
                <Nav />
                <Section 
                        id='landing' 
                        title='FVHCC Activities'
                        subtitle='Games to stimulate the mind'
                    >
                        <Button href='#games' className='button' text='See Games' />
                    </Section>

                    <Section 
                        id='games' 
                        title='Games'
                        subtitle='Browse our collection of games.'
                    >
                        <hr className='divider' />
                        <GameInfo 
                            title='Mystery Word Game'
                            description='Guess the mystery word before you run out of guesses!'
                        >
                            <Link to='/mysteryword' className='button button-outline-red'>Play</Link>
                        </GameInfo>

                        <GameInfo 
                            title='Higher or Lower'
                            description='Guess whether the next number is higher or lower than the current number!'
                        >
                            <Link to='/higherorlower' className='button button-outline-red'>Play</Link>
                        </GameInfo>

                        <GameInfo 
                            title='Jeopardy!'
                            description='Test you trivia knowledge by answering questions from different categories!'
                        >
                            <Link to='/' className='button button-outline-red disabled'>Coming Soon</Link>
                        </GameInfo>
                    </Section>
                    <Footer />
                </div>
        );
    }
}

export default Index;