var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
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