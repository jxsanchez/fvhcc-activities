import React from 'react';
import anime from 'animejs/lib/anime.es';
import { Link } from 'react-router-dom';

import Button from './Button';
import LetterArea from './LetterArea';
import ResultsArea from './ResultsArea';

const words = [
    { 
        category: 'FLOWERS',
        list: ['TULIP', 'VIOLET', 'ROSE', 'DANDELION', 'HYDRANGEA', 
            'HONEYSUCKLE', 'LILAC', 'DAISY', 'BLUEBELL', 'IRIS', 'AMARYLLIS', 'ASTER', 'BELLFLOWER',
            'BUTTERCUP', 'CARNATION', 'LILY', 'CHRYSANTHEMUM', 'CLOVER', 'COSMOS', 'GARDENIA',
            'GERMANIUM', 'GOLDENROD']
    },
    {
        category: 'ANIMALS',
        list: [
            'CAT', 'DOG', 'PARROT'
        ]
    },
    {
        category: 'FRUIT',
        list: [
            'APPLE', 'BANANA', 'ORANGE', 'KIWI', 'BLUEBERRY'
        ]
    }
];

const hiddenCharacter = '_';
const totalGuesses = 10;

// const word = words.list[Math.floor(Math.random() * words.list.length)];
const randWordObjIndex = Math.floor(Math.random() * words.length);
const category = words[randWordObjIndex].category;
const word = words[randWordObjIndex].list[Math.floor(Math.random() * words[randWordObjIndex].list.length)];

class MysteryWord extends React.Component {
    state = { 
        word: word,
        displayWord: Array.from({length: word.length}, (v, i) => hiddenCharacter), 
        guessesLeft: totalGuesses
    };

    componentDidMount() {
        document.title = 'Mystery Word Game | FVHCC Activities';

        anime({
            targets: '.game-info-container',
            translateY: ['-100%', 0],
            duration: 1000,
            easing: 'easeInOutSine'
        });

        anime({
            targets: '.letter',
            translateY: [50, 0],
            // opacity: [0, 1],
            delay: (el, i) => { return i * 50 },
            easing: 'easeInOutSine'
        });
    }

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

    giveUp = () => {
        console.log('hi');
        this.setState({ guessesLeft: 0 });
    }

    render() {
        return (
            <div id='mysteryword' className='section'>
                <div className='game-info-container'>
                    <h1 className='game-title'>Mystery Word</h1>
                    <h2 className='category'>Category: <span className='category-name'>{category}</span></h2>
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
                                <div className='options'>
                                    <Button className='button button-outline-blue' text='Give Up' onClick={this.giveUp} />
                                    <Link className='button' to='/'>
                                        Exit
                                    </Link>
                                </div>
                            </LetterArea> 
                            : ''}
                
                {this.state.guessesLeft === 0 ? 
                <ResultsArea 
                    title='Game Over.'
                    message={`The word is ${word}`}
                    result='error'
                />
                : ''}
                
                {this.state.displayWord.indexOf(hiddenCharacter) === -1 ? 
                <ResultsArea 
                    title='Good job!!!'
                    message='Play again to guess another word!'
                    result='success'
                /> 
                : ''}
            </div>
        );
    }
}

export default MysteryWord;