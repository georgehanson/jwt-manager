var path = require('path');
var webpack = require('webpack');

var babelOptions = {
    // "presets": [
    //     [
    //         "es2015",
    //         {
    //             "modules": false
    //         }
    //     ],
    //     "es2016"
    // ]
};


module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    }
}

if (process.env.NODE_ENV === 'production') {

}