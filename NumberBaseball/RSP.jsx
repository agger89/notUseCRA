import React, { Component } from 'react';

// 클래스 -> constructor -> render -> componentDidMount
// -> setState/props 바뀔때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate
// -> 부모가 나를 없앴을 시 -> componentWillUnmount


const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
};

// 딕셔너리 자료구조
// 보통 index로 접근하는 리스트와 달리
// key값으로 접근하여 원하는 값을 빠르게 찾을 수 있다
const scores = { 
    가위: 1,
    바위: 0,
    보: -1,
};

// Object.entries(rspCoords): 객체를 2차원 배열로 변경
// find 함수로 v(rspCoords)를 반복문을 돌며 return 이 true가 될떄까지 반복문이 돈다
// 즉 rspCoords의 두번째 값과(v[1]) this.state.imgCoord의 값이 같은걸 반환
// ex:) imgCoord의 값이 -142px 이면 반복문을 돌며 v[1]의 값이 -142px 인걸 찾는다 -> 가위
const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
}

class RSP extends Component {
    state = {
        result: '',
        imgCoord: '0',
        score: 0,
    };

    interval;

    // 1초에 한번씩 손모양 변경
    changeHand = () => {
        const {imgCoord} = this.state;
        if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위
            })
        } else if (imgCoord === rspCoords.가위){
            this.setState({
                imgCoord: rspCoords.보
            })
        } else if (imgCoord === rspCoords.보){
            this.setState({
                imgCoord: rspCoords.바위
            })
        }
    }
    componentDidMount() { // 컴포넌트가 첫 랜더링된 후, 비동기 요청을 많이 한다
        this.interval = setInterval(this.changeHand, 100);
    }

    componentWillUpdate() { // 리랜더링 후 

    }

    componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리
        clearInterval(this.interval) // 비동기처리를 제거해주지 않으면 웹사이트가 켜져있는 동안 계속 돌아간다
    }

    // 가위바위보 규칙
    // 가위 1 바위 0 보 -1
    // 나/컴퓨터      가위    바위    보
    //          가위   1 1    1 0   1 -1
    //          바위   0 1    0 0   0 -1
    //          보    -1 1    -1 0  -1 -1 
    // 비겼을때: 0
    // 나 가위 1 - 컴퓨터 가위 1 -> 1 - 1 = 0
    // 나 보 -1 - 컴퓨터 보 -1 -> -1 - (-1) = 0
    // 나 바위 0 - 컴퓨터 바위 0 -> 0 - 0 = 0
    // 이겼을때: -1 or 2
    // 나 가위 1 - 컴퓨터 보 -1 -> 1-(-1) = 2
    // 나 보 -1 - 컴퓨터 바위 0 -> -1 - 0 = -1
    // 나 바위 0 - 컴퓨터 가위 1 -> 0 - 1 = -1
    // 졌을떄: 1 or -2
    // 나 가위 1 - 컴퓨터 바위 0 -> 1 - 0 = 1
    // 나 보 -1 - 컴퓨터 가위 1 -> -1 - 1 = -2
    // 나 바위 0 - 컴퓨터 보 -1 -> 0 - (-1) = 1

    // 아래 마크업에 onClick={() => this.onClickBtn('바위')} 이걸 
    // onClick={this.onClickBtn('바위')} 이렇게 변경하기위해
    // onClickBtn = (choice) => {} 이렇게 되있던 함수를
    // onClickBtn = (choice) => (e) => {} 고차함수로 변환
    onClickBtn = (choice) => (e) => {
        e.preventDefault();
        const {imgCoord} = this.state;
        clearInterval(this.interval);
        // scores 객체에 매개변수 choice를 대입해 값을 만들어준다
        // onClickBtn 함수가 실행되면 매개변수(choice)가 들어온다
        // 매개변수(choice)가 바위이면 scores객체의 바위라는 key값의 value를 반환 -> 0
        const myScore = scores[choice];
        // scores 객체에 위에서 만든 computerChoice함수의 return 값을 대입해 값을 만들어준다
        // computerChoice함수의 return 값이 바위이면 scores객체의 바위라는 key값의 value를 반환 -> 0
        const cpuScore= scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            this.setState({
                result: '비겼습니다!',
            })
          // 변수 diff에 값이 -1 이거나 2이면
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다!',
                    score: prevState.score + 1,
                }
            })
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다!',
                    score: prevState.score - 1,
                }
            })
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 2000);
    }

    render() {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        )
    }
}

export default RSP;