import React from 'react';

class Section extends React.Component {
    render() {
        return (
            <div id={this.props.id} className='section'>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle ? this.props.subtitle : ''}</h2>

                {this.props.children}
            </div>
        );
    }
}

export default Section;