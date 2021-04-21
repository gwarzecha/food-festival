const path = require('path');
// ensures that webpack's methods and properties are being brought into the config file
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;



// main configuration object-- options are written in this object that tell webpack what to do
module.exports = {
  // entry point is the root of the bundle and beginning of the dependency graph
  entry: './assets/js/script.js',
  // put the bundled code into the dist folder
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery', 
      jQuery: 'jquery'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // the report outputs to an HTML file in the dist folder
    })
  ],
  // provides the mode which the code should be run in 
  mode: 'development'
};