const path = require('path');

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

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties']
            },
        }],
    },
    output: {
        path: path.join(__dirname, 'dist'), // dist 폴더와 연결
        filename: 'app.js'
    }, // 출력
};