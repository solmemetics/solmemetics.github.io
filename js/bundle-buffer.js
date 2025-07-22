const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['node_modules/buffer/index.js'],
  bundle: true,
  outfile: 'dist/buffer.js',
  format: 'iife',
  globalName: 'buffer',
  platform: 'browser'
}).then(() => {
  console.log('Buffer bundled successfully!');
}).catch((err) => {
  console.error('Bundling failed:', err);
  process.exit(1);
});