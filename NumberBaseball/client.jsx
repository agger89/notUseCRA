import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root'

import RenderTest from './RenderTest';

const Hot = hot(RenderTest);

ReactDom.render(<Hot />, document.querySelector('#root'));