import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button';
import GameHeader from '../GameHeader';
import GameArea from '../GameArea';
import OptionArea from '../OptionArea';

const highestNum = 25;

const getRandomNum = (highestNum) => {
    return Math.floor(Math.random() * highestNum + 1);
}

class HigherOrLower extends React.Component {
    state = {
        score: 0,
        currentNum: getRandomNum(highestNum),
        nextNum: getRandomNum(highestNum),
        gameOver: false
    };

    componentDidMount() {
        document.title = 'Higher or Lower | FVHCC Activities';
    }

    onOptionClicked = (event) => {
        // value can be higher or lower
        const value = event.target.value;

        console.log(value);

        if(value === 'higher' && this.state.currentNum <= this.state.nextNum) {
            this.setState({score: (this.state.score + 1)});
        } else if(value === 'lower' && this.state.currentNum >= this.state.nextNum) {
            this.setState({score: (this.state.score + 1)});
        } else {
            this.setState({gameOver: true});
        }

        let nextNum = getRandomNum(highestNum);

        while(nextNum === this.state.currentNum) {
            nextNum = getRandomNum(highestNum)
        }

        this.setState({
            currentNum: this.state.nextNum,
            nextNum: nextNum
        });
    }

    playAgain = () => {
        this.setState({
            score: 0,
            currentCard: getRandomNum(highestNum),
            nextNum: getRandomNum(highestNum),
            gameOver: false
        });
    }

    render() {
        return (
            <div id='higherorlower' className='section'>
                <GameHeader title='Higher or Lower'>
                    <span className='num-range'>1 to {highestNum}</span>
                    <p className='score-container'>
                        Score: <span className='big-num'>{this.state.score}</span>
                    </p>
                </GameHeader>

                <GameArea>
                    <div className='current-num-container'>
                        <span className='current-num'>{this.state.currentNum}</span>
                    </div>
                </GameArea>

                <OptionArea>
                    {!this.state.gameOver ? 
                        <div>
                            <p class='message'>Will the next number be</p>
                                <button className='button higher' onClick={e => this.onOptionClicked(e)} value='higher'>
                                    <i class="fas fa-arrow-up"></i> Higher
                                </button>
                                
                                <span className='or-span'>or</span>
                                
                                <button className='button lower' onClick={e => this.onOptionClicked(e)} value='lower'>
                                    <i class="fas fa-arrow-down"></i> Lower
                                </button>
                        </div> :
                        <div>
                            <p class='message'>The next number was <span className='big-num'>{this.state.currentNum}</span></p>
                            
                            <button className='button button-outline-blue' onClick={this.playAgain}>Play Again</button>
                            <Link className='button button-outline-red' to='/'>Exit</Link>
                        </div>
                    }
                </OptionArea>
            </div>
        );
    }
}

export default HigherOrLower;