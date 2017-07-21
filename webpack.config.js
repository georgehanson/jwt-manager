var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            }
        ]
    },
    plugins: []
};

if (process.env.NODE_ENV === 'production') {
    module.exports.publighs.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}