import React from 'react';

const LabelOption = (props) => {
    return (
        <option value={props.option} >{props.option}</option>
    );
}

export default LabelOption;