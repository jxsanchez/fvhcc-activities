import React from 'react';

class Section extends React.Component {
    render() {
        return (
            <div id={this.props.id} className='section'>
                <h1 className='section-title'>{this.props.title}</h1>
                <h2 className='section-subtitle'>{this.props.subtitle ? this.props.subtitle : ''}</h2>

                {this.props.children}

                <hr className='divider' />
            </div>
        );
    }
}

export default Section;