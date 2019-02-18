const path = require('path');

module.exports = {
  entry: {
    app: './src/client/App.js',
    vendor: ['react', 'react-dom', 'react-router-dom', 'querystringify']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  devServer: {
    port: 8000,
    contentBase: 'public',
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000'
      }
    },
    historyApiFallback: true
  },
  devtool: 'cheap-module-eval-source-map'
};
