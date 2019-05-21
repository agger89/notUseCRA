# webpack

# webpack이란
 - 여러개의 javascript 파일을 합쳐서 하나의 javascript 파일로 만들어준다

 # webpack setting 순서
 - 해당 폴더에 index.html 생성 후 초기 마크업 셋팅
 - 해당 폴더 terminal에서 npm init
 - author: jonny, license: MIT 정도 적어주고 yes
 - 그러면 package.json 파일이 생김
    - "dependencies" = 실제 서비스에서 사용
    - "devDependencies" = 개발에서만 사용
 - 이제 필요한 모듈을 설치
 - npm i react react-dom 입력
 - package.json에 아래와 같이 setting 됨
    - "dependencies": {
        "react": "^16.8.6",
        "react-dom": "^16.8.6"
      },
- 그다음 webpack 모듈 설치
- npm i -D webpack webpack-cli 입력 // -D는 개발에서만 사용하겠다는 의미
    - "devDependencies": {
        "webpack": "^4.30.0", // 리액트에 필요한 webpack
        "webpack-cli": "^3.3.1" // 리액트에 필요한 webpack
      }
- 해당 폴더에 webpack.config.js 파일 생성 // 이 파일로 모든게 돌아간다
    - module.exports = {

      }
- 그다음 client.jsx 파일 생성 
    - import React from 'react';
      import ReactDom from 'react-dom';
- index.html에서 <script src="./dist/app.js"></script>
- WordRelay.jsx 파일 생성
    - WordRelay 클래스 생성 후 export default WordRelay;
- 그다음 client.jsx에서 
     - import WordRelay from './WordRelay';
     - ReactDom.render(<WordRelay />, document.querySelector('#root'));
- webpack.config.js에서
    - const path = require('path');
      module.exports = {
          name: 'word-relay-setting',
          mode: 'development', // 실서비스에서는 : production
          devtool: 'eval', // 빠르게 하겠다
          resolve: {
              // 폴더내에 확장자 파일을 알아서 찾아준다
              // 예를들어 밑에 entry 객체안에 './client'
              extensions: ['.js', '.jsx'] 
          },
          entry: {
              app: ['./client'],
          }, // 입력
          output: {
              path: path.join(__dirname, 'dist'), // dist 폴더와 연결
              filename: 'app.js'
          }, // 출력
      };
- package.json에서 npm run dev로 웹팩 빌드 할 수 있게
    - "scripts": {
        "dev": "webpack"
      },
- npm run dev 입력하면 dist 폴더에 app.js 생김
- 그리고 아래와 같은 에러가 날텐데 최신 문법을 읽지 못하는 에러이니 babel을 설치
 ERROR in ./client.jsx 6:16
Module parse failed: Unexpected token (6:16)
You may need an appropriate loader to handle this file type.
| const MyPortfolio = require('./MyPortfolio');
| 
> ReactDOM.render(<MyPortfolio />, document.querySelector('#root'));
- 그 다음 babel 설치
    - npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader @babel/plugin-proposal-class-properties
        - "devDependencies": {
            "@babel/core": "^7.4.4",
            "@babel/plugin-proposal-class-properties": "^7.4.4",
            "@babel/preset-env": "^7.4.4",
            "@babel/preset-react": "^7.0.0",
            "babel-loader": "^8.0.5",
          }   
- webpack.config.js 에서
    - module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties']
            },
        }],
      },
# code 자동 저장 webpack setting 순서
- npm i -D react-hot-loader 터미널 입력 (코드 자동저장)
- npm i -D webpack-dev-server 터미널 입력 (서버를 만들어줌, http://localhost:8080 주소를 준다)
    - package.json 에 생김
        "devDependencies": {
            "react-hot-loader": "^4.8.4",
            "webpack-dev-server": "^3.3.1"
        }
    - package.json 에 아래 처럼 변경
        "scripts": {
            "dev": "webpack-dev-server --hot"
        },
- client.jsx 에서
    - import { hot } from 'react-hot-loader/root'; 추가
    - const Hot = hot(WordRelay) 추가
    - ReactDOM.render(<Hot />, document.querySelector('#root')) 변경
- webpack.config.js 에서 아래처럼 추가
    - plugins: [
        'react-hot-loader/babel'
      ]
    - output: {
        publicPath: '/dist/', // 가상의 경로
      }
- 그다음 dist 폴더 삭제



