const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: 'word-relay-setting',
    mode: 'development', // 실서비스에서는 : production
    devtool: 'eval', // 빠르게 하겠다
    resolve: {
        // 폴더내에 확장자 파일을 알아서 찾아준다
        // 예를들어 밑에 entry 객체안에 './client'
        extensions: ['.js', '.jsx'] 
    },

    // 코드 작성의 흐름
    // entry에 있는 파일에 module 적용하고 plugin 적용하고 output으로 나온다
    entry: {
        app: ['./client'],
    }, // 입력

    module: {
        // js와 jsx 파일에 룰을 적용하겠다
        // 최신문법을 옛날 문법으로 변환하겠다
        rules: [{ 
            test: /\.jsx?/,
            loader: 'babel-loader', 
            options: {
                // @babel/core 최신 문법으로 변환
                // @babel/preset-env 자동으로 예전 브라우저를 지원해주는
                // @babel/preset-react jsx
                // babel-loader babel과 webpack 연결
                // @babel/plugin-proposal-class-properties 클래스 문법을 쓰려면 
                // preset은 plugin 모음을 말하는것
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            // 현재 한국에서 5% 이상인 browser 지원, chrome 마지막 2개의 버전만 지원
                            browsers: ['> 5% in KR', 'last 2 chrome versions'],
                        },
                        debug: true,
                    }],
                    '@babel/preset-react',
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel'
                ]
            },
        }],
    },
    plugins: [
        // 로더에 옵션에 debug를
        new webpack.LoaderOptionsPlugin({ debug: true }),
    ],
    output: {
        path: path.join(__dirname, 'dist'), // dist 폴더와 연결 // 실제 경로
        filename: 'app.js',
        publicPath: '/dist/', // 가상의 경로
    }, // 출력
};