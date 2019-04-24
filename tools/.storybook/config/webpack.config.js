const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre',
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
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
              data: `@import '../../../../src/scss/_helpers/index.scss'; @import '../../../../src/scss/global.scss';`,
              sourceMap: true
            }
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@Components': '../../../../src/js/components',
      '@Pages': '../../../../src/js/pages',
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  plugins: [new MiniCssExtractPlugin()],
}