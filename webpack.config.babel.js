import { VueLoaderPlugin } from 'vue-loader';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import webpack from 'webpack';

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';
const isProd = nodeEnv === 'production';

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
    extensions: ['.vue', '.js', '.json', '.css'],
    alias: {
      '@Components': path.resolve(__dirname, './src/js/components'),
      '@Helpers': path.resolve(__dirname, './src/js/_helpers'),
      '@Pages': path.resolve(__dirname, './src/js/pages'),
    }
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
        test: /\.((post)?css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: isDev }
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                require('postcss-import')(),
                require('postcss-mixins')({
                  mixinsFiles: 'src/css/_helpers/_mixins.css'
                }),
                require('postcss-custom-media')({
                  importFrom: 'src/css/_helpers/_media.css'
                }),
                require('postcss-custom-properties')({
                  preserve: false,
                  importFrom: 'src/css/_helpers/_variables.css'
                }),
                require('postcss-color-function')(),
                require('postcss-nested')(),
                require('autoprefixer')(),
              ],
            },
          },
        ]
      }
    ]
  }
}

if (isDev) {
  config.plugins.push(
    new webpack.DefinePlugin({
      'API_BASE_URL': JSON.stringify('http://api.wiki.gizumo-inc.work/api'),
      'MY_SESSION_STORAGE_KEY': JSON.stringify('dev_gizumo_wiki'),
    })
  );
} else if (isProd) {
  config.plugins.push(
    new webpack.DefinePlugin({
      'API_BASE_URL': JSON.stringify(''),
      'MY_SESSION_STORAGE_KEY': JSON.stringify('prod_gizumo_wiki'),
    })
  );
}

export default config;