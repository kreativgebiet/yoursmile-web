import gulp from 'gulp';
import gutil from 'gulp-util';
import rsync from 'rsyncwrapper';
import { dest, remote } from './config';

gulp.task('deploy', done => {
  rsync({
    src: dest,
    dest: `${remote.user}@${remote.host}:${remote.dest}`,
    ssh: true,
    recursive: true,
    deleteAll: true,
    onStdout: gutil.log,
    onStderr: gutil.log,
    exclude: ['styleguide/', '.DS_Store', '_*.html'],
  }, done);
});
