const path = require('path');
var webpack = require('webpack');

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
  },
  plugins : [
    new webpack.DefinePlugin({ 
      'process.env.SENDGRID_API_KEY': JSON.stringify(process.env.SENDGRID_API_KEY) 
    })
  ]
};


// module.exports.plugins.push(
  // new webpack.DefinePlugin(
  //   { 'process.env.NODE_ENV': JSON.stringify('production') },
  // ),
// );