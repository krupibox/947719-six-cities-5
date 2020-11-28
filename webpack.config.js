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
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            'React': 'react',
            'PropTypes': 'prop-types'
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.node'],
        alias: {
          '@root': path.resolve(__dirname, `src/`),
          '@components': path.resolve(__dirname, `src/components/`),
        }
      },
    devtool: `source-map`,
};
