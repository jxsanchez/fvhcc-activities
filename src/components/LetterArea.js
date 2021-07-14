import React from 'react';

const LetterArea = (props) => {
    const onLetterClicked = (event) => {
        // Hide letter after it is clicked
        event.target.style.display = 'none';

        // Send letter to parent component
        props.handleLetterClicked(event.target.innerText);
    }

    return (
        <div className='letter-area'>
            <div className='letters-container'>
                {props.letters.map(letter => {
                    return <button className="button letter-btn" key={letter} onClick={event => { onLetterClicked(event)}}>{letter}</button>
                })}
            </div>

            {props.children}
        </div>
    )
}

export default LetterArea;