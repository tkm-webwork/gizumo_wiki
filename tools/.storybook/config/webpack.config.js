const path = require('path');
// const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = async({config, mode}) => {
  const vueLoader = config.module.rules.find(({ test }) => {
    return test.toString() === '/\\.vue$/'
  });

  // vueLoader.options.loader = {};
  // vueLoader.options.loader.postcss = [require('postcss-nested')(), require('postcss-custom-properties')(), require('postcss-color-function')(), require('autoprefixer')()];
  // vueLoader.loader = 'vue-style-loader';
  vueLoader.options.postcss = [require('postcss-nested')(), require('postcss-custom-properties')(), require('postcss-color-function')(), require('autoprefixer')()];
  // vueLoader.options.postcss = {};
  // vueLoader.options.postcss.useConfigFile = false;
  // vueLoader.options.postcss.options = [require('postcss-nested')(), require('postcss-custom-properties')(), require('postcss-color-function')(), require('autoprefixer')()];
  console.log(vueLoader);

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  });


  // config.module.rules.push({
  //   test: /\.(css|sass|scss)$/,
  //   use: [
  //     {
  //       loader: 'vue-style-loader',
  //     },
  //     {
  //       loader: 'css-loader',
  //     },
  //     {
  //       loader: 'postcss-loader',
  //       options: {
  //         plugins: [
  //           require('autoprefixer')({
  //             grid: true,
  //             browsers: [
  //               'IE >= 9',
  //               'last 2 versions'
  //             ]
  //           })
  //         ]
  //       }
  //     },
  //     {
  //       loader: 'sass-loader',
  //       options: {
  //         sourceMap: true,
  //         //変数やmixin定義の読み込み
  //         data: `@import '_helpers/index.scss';`,
  //         includePaths: [path.resolve(__dirname, '../../../src/scss/')],
  //       },
  //     },
  //   ]
  // });

  config.module.rules.push({
    test: /\.((post)?css)$/,
    use: [
      // {
      //   loader: MiniCssExtractPlugin.loader,
      // },
      // {
      //   loader: 'vue-style-loader',
      // },
      // {
      //   loader: 'style-loader',
      // },
      // 'vue-style-loader',
      // 'style-loader',
      // {
      //   loader: 'css-loader',
      //   options: { importLoaders: 1 },
      // },
      {
        loader: 'postcss-loader',
        options: {
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

  // config.plugins.push(
  //   new MiniCssExtractPlugin({
  //     filename: 'css/[name].css'
  //   }),
  // );

  // config.plugins.push(
  //   new VueLoaderPlugin()
  // );

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