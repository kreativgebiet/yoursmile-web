import gulp from 'gulp';
import rsync from 'rsyncwrapper';
import runSequence from 'run-sequence';
import { dest, remote } from './config';

gulp.task('deploy', () => {
  runSequence('build', 'push:up');
});

gulp.task('push:up', done => {
  rsync({
    src: dest,
    dest: `${remote.user}@${remote.host}:${remote.dest}`,
    ssh: true,
    recursive: true,
    deleteAll: true,
    exclude: ['styleguide/', '.DS_Store', '_*.html'],
  }, done);
});
