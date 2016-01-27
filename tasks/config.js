module.exports = {
  src: 'source/',
  dest: 'dist/',
  server: {
    port: 3000,
    path: 'dist/',
    lr: true,
  },
  remote: {
    host: 'kreativgebiet.com',
    dest: '/home/deploy/html/ysctw',
    user: 'deploy',
  },
};
