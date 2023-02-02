const path = require('path')
const _externals = require('externals-dependencies')

module.exports = {
  target: 'node',
  mode: 'production',
  entry: {
    app: ['./src/main.ts']
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'js/'
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src'), path.resolve('./src/router')],
    extensions: ['.ts', '.js', '']
  },
  node: {
    global: false,
    __filename: false,
    __dirname: false
  },
  externals: _externals(),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node-modules/
      }
    ]
  }
}
