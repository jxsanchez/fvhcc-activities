import React from 'react';

class Button extends React.Component {
    render() {
        return (
            <a href={this.props.href} className='button'>
                {this.props.text}
            </a>
        );
    }
}

export default Button;