import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
    const [ state, setState ] = useState('waiting');
    const [ message, setMessage ] = useState('클릭해서 시작하세요');
    const [ result, setResult ] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if (state === 'waiting') {
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date(); // 시작 시간
            }, Math.floor(Math.random() * 1000) + 2000); // 2초 ~ 3초 랜덤시간 생성
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');
        } else if (state === 'ready') { // 성급하게 클릭시
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
        } else if (state === 'now') { // 반응속도 체크
            endTime.current = new Date(); // 끝나는 시간
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => // 기존 state 값 넣어줌 prevResult
                [...prevResult, endTime.current - startTime.current]
            )
        }
    };

    const onReset = () => {
        setResult([]);
    };

    return (
        <>
            <div 
                id="screen" 
                className={state} 
                onClick={onClickScreen}
            >
                {message}
            </div>
            {result.length !== 0 
                &&  
                <>
                    <div>
                        평균시간: 
                        {/* 클릭속도 평균값 구하기 */}
                        {/* 기존 배열값 더하기 새로운 배열 / 배열 개수 */}
                        {result.reduce((a, c) => a + c) / result.length}ms
                        </div>
                    <button onClick={onReset}>리셋</button>
                </>
            }
        </>
    )
}

export default ResponseCheck;