const precss = require('precss');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');

module.exports = {
    entry: {
        bundleCss: "./js/indexCss",
        bundle: "./js/index"
    },

    output: {
        path: "bundle",
        filename: '[name].js'
    },
    
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },

    module: {
        loaders: [
            {
              test: /\.ts$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'ts-loader'
            },

            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
            },

            {
                test: /\.png$/, loader: "url-loader?limit=100000"
            }
        ]
    },

    postcss: function () {
        return [precss(), autoprefixer({ browsers: ['last 2 versions'] })];
    },

    plugins: [
        new ExtractTextPlugin('bundle.css')
    ],

    devtool: 'source-map'
};
