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
        // js와 jsx 파일에 룰을 적용하겠다
        // 최신문법을 옛날 문법으로 변환하겠다
        rules: [{ 
            test: /\.jsx?/,
            loader: 'babel-loader', 
            options: {
                // @babel/core 최신 문법으로 변환
                // @babel/preset-env 브라우저에 맞게 최신 문법을 옛날문법으로 변환
                // @babel/preset-react jsx
                // babel-loader babel과 webpack 연결
                // @babel/plugin-proposal-class-properties 클래스 문법을 쓰려면 
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