const React = require('react');
const ReactDOM = require('react-dom');
const { hot } = require('react-hot-loader/root');

const WordRelay = require('./WordRelay');

const Hot = hot(WordRelay);

ReactDOM.render(<Hot />, document.querySelector('#root'));