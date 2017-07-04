const webpack = require('webpack')
const path = require('path')

var host = ''
if(process.env.NODE_ENV === 'development') {
  host = 'http://localhost:4000'
}

const config = {
  entry: [
    './index.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(png|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(jpg|ttf|otf|eot|woff(2)?)$/,
        loader: [`file-loader?name=[name]-[hash].[ext]&publicPath=${host}/images/&outputPath=images/`]
      },
      {
        test: /\.(scss)$/,
        use: ['style-loader', 'css-loader?url=false', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  externals: {
    'react': 'commonjs react'
  },
  plugins: [
    new webpack.DefinePlugin({
      DEVELOPMENT: process.env.NODE_ENV === 'development',
      API_HOST: JSON.stringify(process.env.API_HOST)
    })
  ]
}

if(process.env.NODE_ENV === 'development'){

  config.devServer = {
    port: process.env.PORT || 3000,
    compress: true
  }

}

module.exports = config
