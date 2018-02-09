'use strict';

var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    console.log(stdout);
}

function WebpackShellPlugin(options) {
  this.options = options;
}

WebpackShellPlugin.prototype.apply = function(compiler) {
  const options = this.options;

  compiler.plugin("after-emit", (compilation, callback) => {
    if (options.onAfterEmit.length) {
        options.onAfterEmit.forEach(script => exec(script, puts));
    }
    callback();
  });
};

module.exports = WebpackShellPlugin;
