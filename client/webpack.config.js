const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // HTML Webpack Plugin
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin'
      }),
      // Webpack PWA Manifest
      new WebpackPwaManifest(),
      // Inject Manifest
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js'
      })
    ],

    module: {
      rules: [
        // Rules for CSS loaders
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        // Rules for babel loader
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {targets: "defaults" }]
              ]
            }
          }
        }
      ],
    },
  };
};
