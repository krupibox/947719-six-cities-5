const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        open: false,
        host: '0.0.0.0',
        port: 1335,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            }
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            'React': 'react',
            // 'PureComponent': [`react`, `PureComponent`],
            // 'createRef': [`react`, `createRef`],
            'PropTypes': 'prop-types'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: `source-map`,
};
