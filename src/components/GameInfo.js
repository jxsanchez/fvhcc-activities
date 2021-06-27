import React from 'react';

class GameInfo extends React.Component {
    render() {
        return (
            <div className='game-info'>
                <h3>{this.props.title}</h3>

                <p>{this.props.description}</p>
                
                {this.props.children}
            </div>
        );
    }
}

export default GameInfo;