import React, { Component } from 'react';

const MatchOption = (props) => {
    return (
        <option value={props.option} >{props.option}</option>
    );
}

export default MatchOption;