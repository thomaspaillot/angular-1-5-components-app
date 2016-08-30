import gulp from 'gulp';
import server from 'browser-sync';
import del from 'del';
import path from 'path';
import child from 'child_process';
import gulpUtil from 'gulp-util';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import colorsSupported from 'supports-color';
import historyApiFallback from 'connect-history-api-fallback';

const exec = child.exec;
const root = 'src';
const paths = {
  dist: './dist/',
  static: [
    `${root}/fonts/**/*`,
    `${root}/img/**/*`
  ],
  entry: [
    'babel-polyfill',
    path.join(__dirname, root, 'app/root.module.js')
  ]
};

gulp.task('serve', () => {
  let config = require('./webpack.dev.config.babel').default;
  config.entry.app = ['webpack-hot-middleware/client?reload=true'].concat(paths.entry);
  let compiler = webpack(config);

  server({
    port: 4000,
    open: true,
    server: {baseDir: root},
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false
        },
        publicPath: config.output.publicPath
      }),
      webpackHotMiddleware(compiler)
    ]
  });
});

gulp.task('default', ['serve']);

gulp.task('clean', cb => del(paths.dist + '**/*', cb));

gulp.task('copy', ['clean'], () => {
  return gulp.src(paths.static, { base: 'src' })
    .pipe(gulp.dest(paths.dist));
});

gulp.task('firebase', ['webpack'], cb => {
  return exec('firebase deploy', function (err, stdout, stderr) {
    gulpUtil.log(stdout);
    gulpUtil.log(stderr);
    cb(err);
  });
});

gulp.task('webpack', ['clean'], cb => {
  let config = require('./webpack.dist.config.babel').default;
  config.entry.app = paths.entry;

  webpack(config, (error, stats) => {
    if(error)  {
      throw new gulpUtil.PluginError('webpack', error);
    }

    gulpUtil.log('webpack', stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: true
    }));

    cb();
  });
});

gulp.task('production', [
  'copy',
  'firebase'
]);
