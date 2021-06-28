import React from 'react';

class GameInfo extends React.Component {
    render() {
        return (
            <div className='game-info'>
                <h3 className='game-title'>{this.props.title}</h3>

                <p className='game-description'>{this.props.description}</p>
                
                {this.props.children}

                <hr className='divider' />
            </div>
        );
    }
}

export default GameInfo;