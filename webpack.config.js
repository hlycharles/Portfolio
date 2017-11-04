var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + "/src/index.html",
    filename: 'index.html',
    inject: 'body',
    hash: true,
});

module.exports = {
  entry: __dirname + '/src/index.jsx',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
  },
  devtool: "inlince-source-map",
  devServer: {
      port: 3000,
      historyApiFallback: true,
      stats: {
        chunks: false
      }
  },
  resolve: {
      extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [HTMLWebpackPluginConfig],
}
