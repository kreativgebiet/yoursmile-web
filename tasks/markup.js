import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
import svgstore from 'gulp-svgstore';
import inject from 'gulp-inject';
import revReplace from 'gulp-rev-replace';
import fileinclude from 'gulp-file-include';
import plumber from 'gulp-plumber';
import usemin from 'gulp-usemin';
import rev from 'gulp-rev';
import csso from 'gulp-csso';
import uglify from 'gulp-uglify';
import filter from 'gulp-filter';

import { join } from 'path';

import browserSync from './connect';
import { src, dest } from './config';

let sprites;

gulp.task('sprites', () => {
  sprites = gulp.src(join(src, 'images', '**/*.svg'))
    .pipe(svgmin())
    .pipe(cheerio({
      run: function run($) {
        $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true },
    }))
    .pipe(svgstore({ inlineSvg: true }));
});

gulp.task('markup', ['sprites'], () => {
  const spriteTransform = (filePath, file) => {
    return file.contents.toString();
  };

  const mainPath = join(src, 'html', '**/*.html');
  const includesPath = join('!.', src, 'html', '_partials', '**/*.html');
  const manifest = gulp.src(join(dest, '..', 'rev-manifest.json'));

  gulp.src([
    mainPath,
    includesPath,
  ])
    .pipe(plumber())
    .pipe(inject(sprites, { transform: spriteTransform }))
    .pipe(fileinclude({
      basepath: join(__dirname, '..', src, 'html'),
    }))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
});

gulp.task('markup:build', ['sprites'], () => {
  const spriteTransform = (filePath, file) => {
    return file.contents.toString();
  };

  const mainPath = join(src, 'html', '**/*.html');
  const includesPath = join('!.', src, 'html', '_partials', '**/*.html');
  const manifest = gulp.src(join(dest, '..', 'rev-manifest.json'));

  gulp.src([
    mainPath,
    includesPath,
  ])
    .pipe(plumber())
    .pipe(inject(sprites, { transform: spriteTransform }))
    .pipe(fileinclude({
      basepath: join(__dirname, '..', src, 'html'),
    }))
    .pipe(revReplace({ manifest }))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
});
