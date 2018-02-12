const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'server', 'public')
  },

  module: {
    rules: [
      { 
        test:/\.js$/, 
        use: 'babel-loader', 
        exclude: /node_modules/ 
      },
      
      { 
        test:/\.css$/, 
        use: ['style-loader','css-loader'] 
      },
    ]
  },

  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
};