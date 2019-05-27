const path = require('path');

module.exports = async({config, mode}) => {
  // const vueLoader = config.module.rules.find(({ test }) => {
  //   return test.toString() === '/\\.vue$/'
  // });

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  });


  config.module.rules.push({
    test: /\.(css|sass|scss)$/,
    use: [
      {
        loader: 'vue-style-loader',
      },
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
          sourceMap: true,
          //変数やmixin定義の読み込み
          data: `@import '_helpers/index.scss';`,
          includePaths: [path.resolve(__dirname, '../../../src/scss/')],
        },
      },
    ]
  });

  const alias = {
    '@Components': path.resolve(__dirname, '../../../src/js/components'),
    '@Helpers': path.resolve(__dirname, '../../../src/js/_helpers'),
    '@Pages': path.resolve(__dirname, '../../../../src/js/pages'),
    '@Scss': path.resolve(__dirname, '../../../src/scss'),
  }

  config.resolve.alias = {...config.resolve.alias, ...alias};
  config.resolve.extensions.push('.scss');

  return config;
}