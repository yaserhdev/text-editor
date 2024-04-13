const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');

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
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      // HTML Webpack Plugin
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),
      // Webpack PWA Manifest
      new WebpackPwaManifest({
        fingerprints: false,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'JATE is a progressive web application that serves as a text editor.',
        background_color: '#000000',
        theme_color: '#000000',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('assets/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          }
        ]
      }),
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
