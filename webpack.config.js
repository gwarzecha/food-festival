const path = require('path');
// ensures that webpack's methods and properties are being brought into the config file
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackPwaManifest = require('webpack-pwa-manifest');


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
    }),
    // 'new' means a constructor function is invoked
    new WebpackPwaManifest({
      name: "Food Event",
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      // a unique fingerprint should not be created with each new manifest
      fingerprints: false,
      inject: false,
      icons: [{
        src: path.resolve("assets/img/icons/icon-512x512.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons")
      }]
    })
  ],
  // provides the mode which the code should be run in 
  mode: 'development'
};



