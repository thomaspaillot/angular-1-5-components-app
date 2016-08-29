import webpack from 'webpack';
import path from 'path';
import config from './webpack.config.babel';

config.output = {
  filename: '[name].bundle.js',
  publicPath: '',
  path: path.resolve(__dirname, 'dist')
};

config.plugins = config.plugins.concat([
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['angular', 'exports', 'require']
    }
  })
]);

export default config;
