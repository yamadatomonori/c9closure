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
    
    require('child_process').exec('cake build', function(error, stdout, stderr) {
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
    this.app.get('/' , function(request, response) {
      if (error) {
        response.send(stderr);
      } else {
        response.contentType('js');
        response.send(stdout);
      }
    });
  }
};


new Web;