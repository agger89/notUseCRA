import React, { Component } from 'react';

const Try = ({ tryInfo }) => { // props 로 안넣고 구조분해 { tryInfo }
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
};

export default Try;