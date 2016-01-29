import gulp from 'gulp';
import { src } from './config';
import { join } from 'path';
import sequence from 'run-sequence';

gulp.task('bower:copy', () => {
  gulp.src('./src/bower_components')
    .pipe(gulp.dest('./dest/bower_components'));
});

gulp.task('default', () => {
  sequence(
    'clean',
    'bower:copy',
    ['scripts', 'fonts', 'images', 'markup', 'styles'],
    'server'
  );

  gulp.watch(join(src, 'images', '**/*'), ['images']);
  gulp.watch(join(src, 'html', '**/*.html'), ['markup']);
  gulp.watch(join(src, 'styles', '**/*.{scss,sass}'), ['styles']);
});
