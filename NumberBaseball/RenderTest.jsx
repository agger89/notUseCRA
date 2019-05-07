// PureComponent: shouldComponentUpdate 와 같은 역할
// 보통 PureComponent 를 많이 사용함
// 둘중에 하나만 사용
import React, { PureComponent } from 'react';

class Test extends PureComponent {
    state = {
        counter: 0
    }

    // 성능 최적화
    // 항상 랜더링 시켜주는 바보같은 리액트 떄문에 shouldComponentUpdate
    // 사용해서 state의 변화가 있으면 랜더링
    // 없으면 랜더링 되지 않음
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (this.state.counter !== nextState.counter) {
    //         return true;
    //     }
    //     return false;
    // }

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