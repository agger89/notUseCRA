import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    // Array(45): 45개의 빈 배열을 만든 후 -> 결과값 [empty × 45]
    // fill(): 해당 배열에 정적인 값을 채운다 -> 결과값 [undefined, undefined, ...] x 45개
    // 1부터 45까지의 숫자 배열을 return
    const candidate = Array(45).fill().map((v, i) => i + 1)
    const shuffle = [];
    // candidate 배열의 갯수가 다돌때까지
    while (candidate.length > 0) {
        // 0부터 44의 랜덤한 자리수에서 1개를 추출
        // shuffle 배열에 넣어준다 
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    // 배열의 마지막 번호 추출
    const bonusNumber = shuffle[shuffle.length - 1];
    // shuffle 배열 0 ~ 5까지의 배열을 자른 후 추출, 추출 한 6개의 배열을 오름차순 정렬 
    // a - b: 오름차순, b - a: 내림차순
    const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
    // 리턴값 배열안에 winNumbers 6개의 배열을 넣고, 마지막 배열 자리에는 bonusNumber 배열을 넣는다
    // 그렇게 총 7개의 배열이 생긴다
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    // hooks의 특성상 Lotto 함수 컴포넌트 전체가 다시 랜더링 되는개념이다
    // 그래서 getWinNumbers() 함수가 계속 실행되는데
    // 그걸 막기 위해서 useMemo():(함수의 리턴값을 기억하고 있다)를 사용한다
    // 그리고 useCallback()으로 사용한다
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    // useState는 조건문안에 넣으면 안됨, 반복문안에도 추천하지는 않음
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    // useEffect는 여러번 사용가능
    // 예를들어 조건에 맞게 사용하고 싶을떄, componentDidMount만 하고 싶을때
    useEffect(() => {
        console.log('useEffect');
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]])
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => { // componentWillUnmount 역할
            console.log('componentWillUnmount');
            // 위에 있는 setTimeout 들을 forEach로 돌면서 지워준다
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        }
        // 빈배열 [] 이면 componentDidMount
        // 배열안에 값이 있으면 componentDidUpdate
        // onClickRedo 함수가 실행되면 timeouts가 빈배열[]이 되니까 update
    }, [timeouts.current]); 

    // 한번 더 로또 번호 뽑기위해 초기회
    // useCallback() 으로 useMemo()가 기억하고 있던 값을 실행
    // useCallback(() => {}, [요부분이 update가 될때 useCallback() 실행])
    // tip!! - useCallback()은 이벤트 함수를 자식 컴포넌트에 넘길때 꼭 사용!
    // 예를들어 <Childcomponent onClick={ClickEvent} /> 이렇게 넘길 함수가 있으면
    const onClickRedo = useCallback(() => {
        console.log('onclickredo');
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
        // winNumbers가 바뀌면 useCallback()이 실행
    }, [winNumbers])

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>
                한 번 더!
            </button>}
        </>
    );
}


export default Lotto;