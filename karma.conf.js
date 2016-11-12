var path = require('path')

module.exports = function (config) {
  config.set({
    basePath: '',
    browsers: [ 'PhantomJS' ],
    frameworks: [ 'mocha', 'sinon-chai' ],

    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'karma.test.js'
    ],

    preprocessors: {
      'karma.test.js': [ 'webpack' ]
    },

    exclude: [],

    reporters: [ 'mocha' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,

    client: {
      mocha: {
        reporter: 'html' // change Karma's debug.html to the mocha web reporter
      }
    },

    webpackServer: {
      noInfo: true
    },

    webpackMiddleware: {
      stats: {
        colors: true,
        chunks: false
      }
    },

    mochaReporter: {
      showDiff: true
    },

    webpack: {

      devtool: 'inline-source-map',

      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader'
          }, {
            test: /\.html$/,
            loader: 'html'
          }, {
            test: /\.json$/,
            loader: 'json'
          }, {
            test: /\.jsx?/,
            loader: 'babel'
          }
        ]
      },
      stats: {
        colors: true
      }
    }
  })
}
