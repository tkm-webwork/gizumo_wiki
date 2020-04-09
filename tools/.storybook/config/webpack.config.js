const path = require('path');

module.exports = async({config, mode}) => {
  // const vueLoader = config.module.rules.find(({ test }) => {
  //   return test.toString() === '/\\.vue$/'
  // });

  // NOTE: 下記参考
  // NOTE: https://github.com/storybookjs/storybook/issues/6319#issuecomment-477852640
  // 既存のcss ruleを削除？？
  config.module.rules = config.module.rules.filter(
    f => f.test.toString() !== '/\\.css$/'
  );

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  });


  config.module.rules.push({
    test: /\.((post)?css)$/,
    use: [
      'vue-style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: () => [
            require('postcss-import')(),
            require('postcss-mixins')({
              mixinsFiles: path.resolve(__dirname, '../../../src/css/_helpers/_mixins.css')
            }),
            require('postcss-custom-media')({
              importFrom: path.resolve(__dirname, '../../../src/css/_helpers/_media.css')
            }),
            require('postcss-custom-properties')({
              preserve: false,
              importFrom: path.resolve(__dirname, '../../../src/css/_helpers/_variables.css')
            }),
            require('postcss-color-function')(),
            require('postcss-nested')(),
            require('autoprefixer')(),
          ],
        },
      },
    ]
  });

  const alias = {
    '@Components': path.resolve(__dirname, '../../../src/js/components'),
    '@Helpers': path.resolve(__dirname, '../../../src/js/_helpers'),
    '@Pages': path.resolve(__dirname, '../../../../src/js/pages'),
    '@Css': path.resolve(__dirname, '../../../src/css'),
  }

  config.resolve.alias = {...config.resolve.alias, ...alias};
  config.resolve.extensions.push('.css');

  return config;
}