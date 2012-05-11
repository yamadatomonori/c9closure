/**
 * @constructor
 */
function Web() {
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
    var self = this;
    
    require('child_process').exec('cake builder', function(error, stdout, stderr) {
      self.builderCallback.call(self, error, stdout, stderr);
    });
  },


  /**
   * @param {string} error .
   * @param {string} stdout .
   * @param {string} stderr .
   * @this {Web}
   */
  builderCallback: function(error, stdout, stderr) {
    var self = this;
      
    require('child_process').exec('cat client/js/compiled.js', function(error, stdout, stderr) {
      self.app.get('/' , function(request, response) {
        if (error) {
          response.send(stderr);
        } else {
          response.contentType('js');
          response.send(stdout);
        }
      });
    });
  }
};


new Web;