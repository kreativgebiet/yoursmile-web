import gulp from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import plumber from 'gulp-plumber';

import { join } from 'path';
import browserSync from './connect';
import { src, dest } from './config';

gulp.task('images', () => {
  return gulp.src(join(src, 'images', '**/*'))
    .pipe(changed(join(dest, 'images')))
    .pipe(gulp.dest(join(dest, 'images')))
    .pipe(browserSync.stream());
});

gulp.task('images:build', () => {
  return gulp.src(join(src, 'images', '**/*'))
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(join(dest, 'images')));
});
