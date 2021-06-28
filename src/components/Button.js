import React from 'react';

class Button extends React.Component {
    // Ambiguous function, look up way to set onClick a better way
    handleClick = () => {
        this.props.onClick();
    }

    render() {
        return (
            <a href={this.props.href} className={this.props.className} onClick={this.props.onClick ? this.handleClick : ''}>
                {this.props.text}
            </a>
        );
    }
}

export default Button;