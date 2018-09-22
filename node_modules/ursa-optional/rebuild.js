var cp = require('child_process');
var p = cp.spawnSync(require('which').sync('npm'), ['run', 'rebuild'], {cwd: process.cwd()});
if (p.status || p.signal || p.error) {
  console.log('ursaNative bindings compilation fail. This is not an issue. Modules that depend on it will use fallbacks.');
  var fs = require('fs');
  if (p.error) {
    fs.writeFileSync('./stderr.log', p.error.stack);
  } else {
    fs.writeFileSync('./stdout.log', p.stdout);
    fs.writeFileSync('./stderr.log', p.stderr);
  }
}
