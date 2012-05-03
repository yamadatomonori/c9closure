/**
 * @constructor
 * @param {Object} arg preference of building.
 */
function Web(arg) {
    
  /**
   * @param {string} key key of preference.
   */
  this.getPreference = function(key) {
    return arg[key];
  };
      
  this.init.call(this);
}


Web.prototype = {

  /**
   * @this {Web}
   */
  init: function() {
    var express = require('express');
  
    this.app = express.createServer(express.logger());

    this.app.listen(process.env.PORT || 3000, function() {
      console.log("Listening");
    });
    
    this.compile();
  },
  
  
  /**
   * @this {Web}
   */
  compile: function() {
    var command = 'python closure-library/closure/bin/build/closurebuilder.py ' +
    '--compiler_flags="--compilation_level=' + this.getPreference('compilationLevel') + '" ' +
    '--compiler_flags="--output_wrapper=(function() {%output%})();" ' +
    '--compiler_jar=compiler.jar ' + 
    '--namespace="myproject.start" ' +
    '--output_mode=' + this.getPreference('outputMode') + ' ' +
    '--root=closure-library/ ' +
    '--root=client/';

    var self = this;

    //command = 'python -h';
    
    require('child_process').exec(command, function(error, stdout, stderr) {
        console.log(11111);
      self.execCallback.call(self, error, stdout, stderr);
    });
  },


  /**
   * @param {string} error .
   * @param {string} stdout .
   * @param {string} stderr .
   * @this {Web}
   */
  execCallback: function(error, stdout, stderr) {
        console.log(22222);
    this.app.get('/' , function(request, response) {
        console.log(33333);
      if (error) {
        response.send(stderr);
      } else {
        response.send(stdout);
      }
    });
  }
};


new Web({
  compilationLevel: 'ADVANCED_OPTIMIZATIONS',
  outputMode: 'compiled'
});