const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

var config = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader'
      // },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
         new VueLoaderPlugin()
  ]
};


module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'vue-clock.min.js',
      libraryTarget: 'window',
      library: 'VueClock',
    }
  }),
  merge(config, {
    entry: path.resolve(__dirname + '/src/Clock.vue'),
    output: {
      filename: 'vue-clock.js',
      libraryTarget: 'umd',
      library: 'vue-clock',
      umdNamedDefine: true
    }
  })
];
