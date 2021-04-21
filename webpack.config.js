const path = require('path');
// ensures that webpack's methods and properties are being brought into the config file
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;



// main configuration object-- options are written in this object that tell webpack what to do
module.exports = {
  // entry point is the root of the bundle and beginning of the dependency graph
  entry: { 
    app: './assets/js/script.js',
    events: './assets/js/events.js',
    schedule: './assets/js/schedule.js',
    tickets: './assets/js/tickets.js'
  },
  // put the bundled code into the dist folder
  output: {
    // the name of each attribute in the entry obj will be used in place of [name] in each bundle.js file created
    filename: '[name].bundle.js',
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        test: /\.jpg$/i,
        use: [
          {
            // file-loader processes the imgs
            loader: "file-loader",
            // HOW DOES IT DO THIS?!?!?!?!?!?
            options: {
              name (file) {
                return "[path][name].[ext]"
              },
              publicPath: function(url) {
                return url.replace("../", "/assets/")
              }
            }  
          },
          {
            // package for img optimization
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
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