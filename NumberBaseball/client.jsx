import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root' // 코드 자동저장

import Lotto from './Lotto';

const Hot = hot(Lotto); 

ReactDom.render(<Hot />, document.querySelector('#root'));