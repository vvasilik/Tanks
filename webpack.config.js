const precss = require('precss');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');

module.exports = {
    entry: './js/index',

    output: {
        path: "bundle",
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel',
              query: {
                  presets: ['es2015']
              }

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
