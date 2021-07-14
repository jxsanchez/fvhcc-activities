import React from 'react';

const Select = props => {
    const onOptionChange = (event) => {
        props.handleOptionChange(event.target.value);
    }

    return (
        <div>
            <label className='category' htmlFor={props.name}>{props.labelText}</label>
            <select id={props.name} value={props.selected} className='select' onChange={event => { onOptionChange(event) }}>
                {props.options.map(option => {
                    return <option key={option} value={option}>{option}</option>;
                })}
            </select>
        </div>
    );
}

export default Select;