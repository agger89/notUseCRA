import React, { Component } from 'react';
import Try from './Try';

function getNumbers() { // 숫자 4개를 겹치치 않게 랜덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0; i < 4; i += 1) { // i가 4보다 작을때까지 i는 1씩증가
        // splice: array.splice( start, count ) 특정 범위의 값을 추출
        // Math.floor: 소수점 이하를 버림
        // Math.random: 랜덤 숫자를 반환
        // candidate 배열의 랜덤 갯수 중 하나를 추출하여 array에 넣어준다
        const chosen = candidate.splice(Math.floor( Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm = (e) => {
        console.log(this.state.answer.join(''));
        e.preventDefault();
        // join(''): 배열의 원소들을 연결 [5, 1, 4, 2] => 5142
        if (this.state.value === this.state.answer.join('')) { // 정답이면
            this.setState({
                result: '홈런! 게임을 다시 시작합니다.',
                tries: [...this.state.tries, { try: this.state.value, result: '홈런!'}],
            })
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            })
        } else { // 틀렸을떄
            // this.state.value가 1234면 split('')을 이용해 배열 [1, 2, 3, 4]로 만들고
            // 문자열로 되어있는 배열의 값들을 정수로 변환해준다
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9) { // 10번이상 틀렸으면 (tries 배열의 갯수가 9보다 크거나 같으면)
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}였습니다!`
                })
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                })
            } else { // 10번이상 틀리지 않았으면 몇 ball 몇 strike 알려주고 기회 더주고
                for (let i = 0; i < 4; i += 1) {
                    // 두배열의 인덱스중에 같은 자리가 있으면 strike에 1을 더해준다
                    if (answerArray[i] === this.state.answer[i]) {
                        strike += 1;
                    // this.state.answer 숫자중에 같은 자리는 아니지만 
                    // answerArray[i] 숫자와 겹치는게 있으면 ball에 1을 더해준다
                    } else if (this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                // 틀려서 tries 배열에 계속 쌓임
                this.setState({
                    tries: [...this.state.tries, { try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
                    value: '',
                    result: '',
                })
            }
        }
    }

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v, i) => {
                        return (
                            <Try key={i} tryInfo={v} />
                        )
                    })}
                </ul>
            </>
        )
    }
}

export default NumberBaseball; // 바깥에서도 사용할수 있게