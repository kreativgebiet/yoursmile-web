import gulp from 'gulp';

import del from 'del';
import { dest } from './config';

gulp.task('clean', () => {
  del([
    `${dest}/**/*`,
    `!${dest}/bower_components`,
    `!${dest}/bower_components/**`,
    `!${dest}/bower_components/**/*`,
  ]);
});
