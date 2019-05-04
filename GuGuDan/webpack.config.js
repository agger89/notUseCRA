const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.jsx', '.js']
    },
    entry: {
        app: './client',
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-react', '@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties']
            }
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'), // dist 폴더와 연결
        filename: 'app.js',
    },
}