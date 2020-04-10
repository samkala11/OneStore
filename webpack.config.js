const path = require('path');

module.exports = {
  context: __dirname,
  entry: './app/javascript/frontend/index.js',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascript'),
    filename: 'bundle.jsx'
  },
  resolveLoader: {
    modules: [ path.resolve('node_modules') ]
  },    
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      }
    ]
  },
  devtool: 'source-map',
  node: {
    net: 'empty',      
    fs: 'empty',
    tls: 'empty'
  } 
};