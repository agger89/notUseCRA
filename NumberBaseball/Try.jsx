import React, { memo } from 'react';


const Try = memo(({ tryInfo }) => { // props 로 안넣고 구조분해 { tryInfo }
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
});

export default Try;