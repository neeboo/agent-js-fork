import path from 'path';
// tslint:disable-next-line: no-implicit-dependencies
import TerserPlugin from 'terser-webpack-plugin';
// tslint:disable-next-line: no-implicit-dependencies
import { Configuration, ProvidePlugin } from 'webpack';

import packageList from '../config';

function createBatchConfig(list: string[]) {
  return list.map((lib: string) => {
    const entryBase = {};
    entryBase[lib] = [`./packages/${lib}/build/index.js`];

    const batchBaseConfig = {
      entry: entryBase,
      mode: 'production',
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              // `.swcrc` can be used to configure swc
              loader: 'swc-loader',
            },
          },
        ],
      },
      devtool: 'source-map',
      resolve: {
        symlinks: true,
        extensions: ['.js'],

        fallback: {
          // assert: require.resolve('assert/'),
          buffer: require.resolve('buffer/'),
          // events: require.resolve('events/'),
          // stream: require.resolve('stream-browserify/'),
          // util: require.resolve('util/'),
          // os: require.resolve('os-browserify/browser'),
          // https: require.resolve('https-browserify'),
          // http: require.resolve('stream-http'),
          // crypto: require.resolve('crypto-browserify'),
          // borc: require.resolve('borc'),
        },
      },

      plugins: [
        new ProvidePlugin({
          Buffer: [require.resolve('buffer/'), 'Buffer'],
          process: 'process/browser',
        }),

      ],
    };
    const batchClientConfig = {
      ...batchBaseConfig,
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              ecma: 2015,
              compress: true,
              mangle: true,
              toplevel: false,
              output: {
                beautify: false,
                comments: false,
              },
            },
            parallel: true,
          }),
        ],
      },
      output: {
        libraryTarget: 'module',
        // library: lib,
        filename: 'index.js',
        // filename: '[name].browser.js',
        path: path.join(__dirname, '../../../', `./packages/${lib}/dist/`),
      },
      experiments: {
        outputModule: true,
      },
    };
    return [batchBaseConfig, batchClientConfig];
  });
}

function reduceDimension(arr: any[]) {
  return Array.prototype.concat.apply([], arr);
}

const batch: Configuration = reduceDimension(createBatchConfig(packageList));

// tslint:disable-next-line: no-default-export
export default batch;
