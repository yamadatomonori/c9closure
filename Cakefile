muffin = require 'muffin'
sys = require 'sys'
Q = require 'q'

      
task 'templates', 'convert soy into js', ->
  muffin.exec 'java -jar ./jar/SoyToJsSrcCompiler.jar
    --shouldGenerateJsdoc
    --shouldProvideRequireSoyNamespaces
    --cssHandlingScheme GOOG
    --outputPathFormat client/js/{INPUT_FILE_NAME_NO_EXT}Templates.js
    ./client/soy/AmbBlogPostUcs.soy'
  
  
    
task 'builder', 'building closure library script', ->
  Q.when Q.all([
      (invoke 'templates')[1]
  ]), (result) ->
    command = 'python closure-library/closure/bin/build/closurebuilder.py
      --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS"
      --compiler_flags="--output_wrapper=(function() {%output%})();" 
      --compiler_jar=./jar/compiler.jar
      --namespace="myproject.start" 
      --output_mode=compiled
      --root=client/js'

    command = 'ls -la ./client/js'
    
    Q.when (muffin.exec command)[1], (result) ->
      sys.print result[0]