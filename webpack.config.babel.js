import { VueLoaderPlugin } from 'vue-loader';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';

console.log('==================================================');
console.log('== nodeEnv ==> ', nodeEnv);
console.log('== isDev ==> ', isDev);
console.log('== ', path.resolve(__dirname));
console.log('==================================================');

const src = path.resolve(__dirname, './src');
const dist = path.resolve(__dirname, './public');

const config = {
  mode: nodeEnv,
  devtool: isDev ? 'source-map' : 'eval',
  resolve: {
    extensions: ['.vue', '.js', '.json', '.scss'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new WebpackNotifierPlugin({
      excludeWarnings: true,
      title: 'Gizumo Wiki'
    }),
  ],
  devServer: {
    open: true,
    inline: true,
    hot: true,
    port: 8000,
    watchContentBase: true,
    contentBase: dist,
    historyApiFallback: true,
  },
  entry: {
    app: [
      `${src}/js/app.js`,
    ]
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: dist,
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|vue)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: { failOnError: false }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: isDev }
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  grid: true,
                  browsers: [
                    'IE >= 9',
                    'last 2 versions'
                  ]
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // outputStyle: 'expanded',
              data: `@import './src/scss/_helpers/index.scss';`
            }
          }
        ]
      }
    ]
  }
}

export default config;