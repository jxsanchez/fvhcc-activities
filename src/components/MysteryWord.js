import React from 'react';
import LetterArea from './LetterArea';
import ResultsArea from './ResultsArea';

const words = {
    category: 'FLOWERS',
    list: ['TULIP', 'VIOLET', 'ROSE', 'DANDELION', 'HYDRANGEA', 'HONEYSUCKLE', 'LILAC']
};

const word = words.list[Math.floor(Math.random() * words.list.length)];

class MysteryWord extends React.Component {
    state = { 
        displayWord: Array.from({length: word.length}, (v, i) => '*'), 
        guessesLeft: 10
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
        let temp = [...this.state.displayWord]; // Array that will replace all instances of * with letter

        let index = 0; // Index where search will begin
        let foundIndex = word.indexOf(letter, index); // Result of indexOf()

        // Replace all instances of * with current letter in temp array
        while(foundIndex !== -1) {
            temp[foundIndex] = letter; 

            index = foundIndex + 1; // Start next search after the current instance of letter
            foundIndex = word.indexOf(letter, index); // Find next instance of letter
        }

        this.setState({displayWord: temp}); // Update state to add all occurances found letter
    }

    render() {
        return (
            <div>
                <h1>Mystery Word</h1>
                <h2>Category: {words.category}</h2>
                <div>
                    Guesses Left: { this.state.guessesLeft }
                    <br />
                    {this.state.displayWord}
                </div>
                {this.state.guessesLeft > 0 && this.state.displayWord.indexOf('*') !== -1 ? <LetterArea handleLetterClicked={this.handleLetterClicked} /> : ''}
                
                {this.state.guessesLeft === 0 ? <ResultsArea message='Out of Guesses!' solution={`The word was ${word}`} />
                                              : ''}
                
                {this.state.displayWord.indexOf('*') === -1 ? <ResultsArea message='Congratulations, you got it!' /> : ''}
            </div>
        );
    }
}

export default MysteryWord;