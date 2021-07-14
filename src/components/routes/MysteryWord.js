import React from 'react';
import anime from 'animejs/lib/anime.es';
import { Link } from 'react-router-dom';

import Button from '../Button';
import Select from '../Select';
import GameHeader from '../GameHeader';
import GameArea from '../GameArea';
import LetterArea from '../LetterArea';
import ResultsArea from '../ResultsArea';

import words from '../../assets/words';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const hiddenCharacter = '_';
const totalGuesses = 10;

// Get random index of object in words array
const randWordObjIndex = Math.floor(Math.random() * words.length);

// Get category of randomly selected object
const category = words[randWordObjIndex].category;

// Store all categories in array
const categories = words.map(wordObj => {
    return wordObj.category;
});

// Get word from word array in randomly selected object
const word = words[randWordObjIndex].list[Math.floor(Math.random() * words[randWordObjIndex].list.length)];

class MysteryWord extends React.Component {
    state = { 
        category: category,
        word: word,
        displayWord: Array.from({length: word.length}, (v, i) => hiddenCharacter),
        letters: Array.from(alphabet),
        guessesLeft: totalGuesses
    };

    componentDidMount() {
        document.title = 'Mystery Word Game | Senior Activity Games';

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

    handleCategoryChange = (nextCategory) => {
        // Get index of wordObject using name of category
        const wordObjIndex = words.findIndex(wordObject => { return wordObject.category === nextCategory });
        
        const nextWord = words[wordObjIndex].list[Math.floor(Math.random() * words[wordObjIndex].list.length)];

        this.setState({
            category: nextCategory,
            letters: Array.from(alphabet),
            word: nextWord,
            displayWord: Array.from({length: nextWord.length}, (v, i) => hiddenCharacter),
            guessesLeft: totalGuesses
        });

        const letterBtns = document.querySelectorAll(".letter-btn");

        letterBtns.forEach(letterBtn => {
            letterBtn.style.display = 'inline-block';
        });
    }

    // Function sent to child, LetterArea, to get letter clicked
    handleLetterClicked = (letter) => {
        // Finds all occurences of letter if in word, else decrement guessesLeft
        if(this.state.word.indexOf(letter) !== -1) {
            this.findAllOccurences(letter);            
        } else {
            this.setState({ guessesLeft: this.state.guessesLeft - 1 });
        }
    }

    // Find all occurances of the specified letter and replace them in a temp array that will update state of displayWord
    findAllOccurences = (letter) => {
        let temp = [...this.state.displayWord]; // Array that will replace all instances of hiddenCharacter with letter

        console.log(temp);

        let index = 0; // Index where search will begin
        let foundIndex = this.state.word.indexOf(letter, index); // Result of indexOf()

        // Replace all instances of hiddenCharacter with current letter in temp array
        while(foundIndex !== -1) {
            temp[foundIndex] = letter; 

            index = foundIndex + 1; // Start next search after the current instance of letter
            foundIndex = this.state.word.indexOf(letter, index); // Find next instance of letter
        }

        this.setState({displayWord: temp}); // Update state to add all occurances found letter
    }

    playAgain = () => {
        // Get index of wordObject using name of category
        const wordObjIndex = words.findIndex(wordObject => { return wordObject.category === this.state.category });

        const nextWord = words[wordObjIndex].list[Math.floor(Math.random() * words[wordObjIndex].list.length)];

        this.setState({
            letters: Array.from(alphabet), // might not need this, will test later
            word: nextWord,
            displayWord: Array.from({length: nextWord.length}, (v, i) => hiddenCharacter),
            guessesLeft: totalGuesses
        });

        const letterBtns = document.querySelectorAll(".letter-btn");

        letterBtns.forEach(letterBtn => {
            letterBtn.style.display = 'inline-block';
        });
    }

    giveUp = () => {
        this.setState({ guessesLeft: 0 });
    }

    render() {
        return (
            <div id='mysteryword' className='section'>
                <GameHeader title='Mystery Word'>
                    <Select 
                        id='category-select'
                        labelText='Category:'  
                        options={categories} 
                        selected={this.state.category} 
                        handleOptionChange={this.handleCategoryChange}
                    />

                    <p className='guesses-left'>
                        Guesses Left:
                        <span 
                            className={`guess-num ${this.state.guessesLeft <= 3 ? 'warning' : ''}
                                        ${this.state.guessesLeft === 0 ? 'error' : ''}`}>
                            { this.state.guessesLeft }
                        </span>
                    </p>
                </GameHeader>

                <GameArea>
                    {/* Show a blank space representing each letter of the current word */}
                    {this.state.displayWord.map((letter, index) => {
                        return <div key={index} className='letter'>{letter}</div>;
                        })}
                </GameArea>
                
                {this.state.guessesLeft > 0 && this.state.displayWord.indexOf(hiddenCharacter) !== -1 ? 
                            <LetterArea handleLetterClicked={this.handleLetterClicked} letters={this.state.letters}>
                                <div className='options'>
                                    <Button className='button button-outline-blue' text='Give Up' onClick={this.giveUp} />
                                    <Link className='button' to='/'>
                                        Exit
                                    </Link>
                                </div>
                            </LetterArea> 
                            : ''}
                
                {/* Display lose state if guesses left is 0 */}
                {this.state.guessesLeft === 0 ? 
                <ResultsArea 
                    title='Game Over'
                    message={`The word is ${this.state.word}`}
                    result='error'
                    onClick={this.playAgain}
                />
                : ''}
                
                {/* Display the win state if there are no more underscores on the screen */}
                {this.state.displayWord.indexOf(hiddenCharacter) === -1 ? 
                <ResultsArea 
                    title='Good job!!!'
                    message='Play again to guess another word!'
                    result='success'
                    onClick={this.playAgain}
                /> 
                : ''}
            </div>
        );
    }
}

export default MysteryWord;