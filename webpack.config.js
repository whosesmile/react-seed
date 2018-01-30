// Generate schema.js
require('./schema.config');

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 独立打包
// const SCRIPT_FORMAT = '[name].[chunkhash].js';
// const STYLES_FORMAT = '[name].[contenthash:20].css';

// 整合打包
const SCRIPT_FORMAT = '[name].bundle.js';
const STYLES_FORMAT = '[name].bundle.css';

module.exports = function(env, args) {
  env = env || process.env.NODE_ENV;
  const config = Config(env);

  return {
    entry: {
      app: './src/index.jsx',
    },
    output: {
      filename: SCRIPT_FORMAT,
      chunkFilename: SCRIPT_FORMAT,
      path: path.resolve(__dirname, 'dist'),
      publicPath: config.publicPath,
    },

    module: {
      rules: [{
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: { sourceMap: true, minimize: config.minimize, localIdentName: '[hash:base64:8]' }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          }, {
            loader: 'less-loader',
            options: { sourceMap: true }
          }],
        })
      }, {
        test: /\.(jpg|jpeg|gif|png)$/,
        use: ['file-loader'],
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      }, {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }, {
          loader: 'eslint-loader',
        }],
      }],
    },

    plugins: config.plugins,

    devtool: config.devtool,

    devServer: {
      contentBase: './dist',
      port: config.port,
      host: '0.0.0.0',
      // hot: true,
      disableHostCheck: true,
      historyApiFallback: true,
      proxy: {
        '/mock': {
          target: 'http://localhost:3000',
          pathRewrite: { '^/mock': '' },
        }
      }
    },

    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        library: path.resolve(__dirname, 'library'),
      },
    },

  };

};

// 区分环境
function Config(env) {
  return {
    port: 8080,
    get plugins() {
      // 生成环境
      if (env === 'production') {
        return [
          new CleanWebpackPlugin(['dist']),
          new webpack.NamedChunksPlugin(),
          new webpack.HashedModuleIdsPlugin({ hashDigestLength: 8 }),
          new ExtractTextPlugin(STYLES_FORMAT),
          new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
          new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
          new HtmlWebpackPlugin({ title: 'HEELO WORLD', template: 'index.html' }),
          new webpack.ProvidePlugin({ axios: 'axios' }),
          new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
              return module.context && module.context.indexOf('node_modules') !== -1;
            },
          }),
          new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
          }),
        ];
      }

      // 开发环境
      return [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin(STYLES_FORMAT),
        new HtmlWebpackPlugin({ title: 'HEELO WORLD', template: 'index.html' }),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env || 'development') }),
        new webpack.ProvidePlugin({ axios: 'axios' }),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: function(module) {
            return module.context && module.context.indexOf('node_modules') !== -1;
          },
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'manifest',
        }),
      ];
    },

    get devtool() {
      if (env === 'production') {
        return 'source-map';
      }
      // BUG:https://github.com/webpack/webpack-dev-server/issues/1090
      // return 'cheap-eval-source-map';
      return 'source-map';
    },

    get minimize() {
      return env === 'production';
    },

    // 动态计算的原因是为了确定动态加载脚本的路径
    get publicPath() {
      return env === 'simulation' ? '/' : '/resources/redux/';
    },
  };
};
