import React, { Component } from 'react';
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


class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(), // 당첨 숫자들
        winBalls: [],
        bonus: null, // 보너스 공
        redo: false,
    };

    // 배열로 만들어서 여러개를 setTimeout을 한번에 지정할수있게
    timeouts = []; 

    // setTimeout 함수
    runTimeouts = () => {
        console.log('runTimeouts');
        const { winNumbers } = this.state;
        for (let i = 0; i < winNumbers.length - 1; i++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    }
                })
            }, (i + 1) * 1000);
        }
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true
            })
        }, 7000);
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.runTimeouts();
    }

    // componentDidUpdate는 setState 될때마다 실행은 된다
    componentDidUpdate(prevProps, prevState) {
        // winBalls의 배열 갯수가 0이면 실행
        if (this.state.winBalls.length === 0) {
            console.log('componentDidUpdate');
            this.runTimeouts();
        }
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        // 위에 있는 setTimeout 들을 forEach로 돌면서 지워준다
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    }

    // 한번 더 로또 번호 뽑기위해 초기회
    onClickRedo = () => {
        console.log('onclickredo');
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false,
        })
        this.timeouts = [];
    }

    render() {
        console.log('render');
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>
                    한 번 더!
                </button>}
            </>
        )
    }
}

export default Lotto;