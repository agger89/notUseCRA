import React, { Component } from 'react';

class Test extends Component {
    state = {
        counter: 0
    }

    // 성능 최적화
    // 항상 랜더링 시켜주는 바보같은 리액트 떄문에 shouldComponentUpdate
    // 사용해서 state의 변화가 있으면 랜더링
    // 없으면 랜더링 되지 않음
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.counter !== nextState.counter) {
            return true;
        }
        return false;
    }

    onClick = () => {
        this.setState({});
    }
    render() {
        console.log('랜더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        )
    }
}

export default Test;