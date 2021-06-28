import React from 'react';
import { Link } from 'react-router-dom';

import LetterArea from './LetterArea';
import ResultsArea from './ResultsArea';

const words = {
    category: 'FLOWERS',
    list: ['TULIP', 'VIOLET', 'ROSE', 'DANDELION', 'HYDRANGEA', 'HONEYSUCKLE', 'LILAC']
};

const hiddenCharacter = '_';
const totalGuesses = 10;

const word = words.list[Math.floor(Math.random() * words.list.length)];

class MysteryWord extends React.Component {
    state = { 
        word: word,
        displayWord: Array.from({length: word.length}, (v, i) => hiddenCharacter), 
        guessesLeft: totalGuesses
    };

    // Function sent to child, LetterArea, to get letter clicked
    handleLetterClicked = (letter) => {
        // Finds all occurences of letter if in word, else decrement guessesLeft
        if(word.indexOf(letter) !== -1) {
            this.findAllOccurences(letter);            
        } else {
            this.setState({ guessesLeft: this.state.guessesLeft - 1 });
        }
    }

    // Find all occurances of the specified letter and replace them in a temp array that will update state of displayWord
    findAllOccurences = (letter) => {
        let temp = [...this.state.displayWord]; // Array that will replace all instances of hiddenCharacter with letter

        let index = 0; // Index where search will begin
        let foundIndex = word.indexOf(letter, index); // Result of indexOf()

        // Replace all instances of hiddenCharacter with current letter in temp array
        while(foundIndex !== -1) {
            temp[foundIndex] = letter; 

            index = foundIndex + 1; // Start next search after the current instance of letter
            foundIndex = word.indexOf(letter, index); // Find next instance of letter
        }

        this.setState({displayWord: temp}); // Update state to add all occurances found letter
    }

    render() {
        return (
            <div id='mysteryword' className='section'>
                <div className='game-info-container'>
                    <h1 className='game-title'>Mystery Word</h1>
                    <h2 className='category'>Category: {words.category}</h2>
                    <p className='guesses-left'>
                        Guesses Left:
                        <span 
                            className={`guess-num ${this.state.guessesLeft <= 3 ? 'warning' : ''}
                                        ${this.state.guessesLeft === 0 ? 'error' : ''}`}>
                            { this.state.guessesLeft }
                        </span>
                    </p>
                </div>
                <div className='mystery-word-container'>
                    {this.state.displayWord.map((letter, index) => {
                       return <div key={index} className='letter'>{letter}</div>;
                    })}
                </div>
                {this.state.guessesLeft > 0 && this.state.displayWord.indexOf(hiddenCharacter) !== -1 ? 
                            <LetterArea handleLetterClicked={this.handleLetterClicked}>
                                <Link className='button' to='/'>
                                    Quit
                                </Link>
                            </LetterArea> 
                            : ''}
                
                {this.state.guessesLeft === 0 ? 
                <ResultsArea 
                    title='Game Over!'
                    message={`The word is ${word}`}
                    result='error'
                />
                : ''}
                
                {this.state.displayWord.indexOf(hiddenCharacter) === -1 ? 
                <ResultsArea 
                    title='Good job, you are correct!'
                    message='Guess another word!'
                    result='success'
                /> 
                : ''}
            </div>
        );
    }
}

export default MysteryWord;