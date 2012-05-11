muffin = require 'muffin'
sys = require 'sys'
Q = require 'q'

      
task 'stylesheets', 'convert gss into css', ->
  muffin.exec 'java -jar jar/closure-stylesheets.jar
    --output-file client/css/compiled.css
    --output-renaming-map client/js/renaming_map.js
    --output-renaming-map-format CLOSURE_COMPILED
    --rename CLOSURE
  
    ./client/js/closure-library/closure/goog/css/common.css
    ./client/js/closure-library/closure/goog/css/button.css
    ./client/js/closure-library/closure/goog/css/menu.css
    ./client/js/closure-library/closure/goog/css/menuitem.css
    ./client/js/closure-library/closure/goog/css/toolbar.css
    ./client/js/closure-library/closure/goog/css/colormenubutton.css
    ./client/js/closure-library/closure/goog/css/palette.css
    ./client/js/closure-library/closure/goog/css/colorpalette.css
    ./client/js/closure-library/closure/goog/css/editortoolbar.css'
  
  
task 'templates', 'convert soy into js', ->
  muffin.exec 'java -jar ./jar/SoyToJsSrcCompiler.jar
    --shouldGenerateJsdoc
    --shouldProvideRequireSoyNamespaces
    --cssHandlingScheme GOOG
    --outputPathFormat client/js/{INPUT_FILE_NAME_NO_EXT}Templates.js
    
    ./client/soy/AmbBlogPostEditor.soy
    ./client/soy/AmbBlogPostUcs.soy'
  
    
task 'builder', 'building closure library script', ->
  Q.when Q.all([
      (invoke 'stylesheets')[1]
      (invoke 'templates')[1]
  ]), (result) ->
    command = 'python client/js/closure-library/closure/bin/build/closurebuilder.py
      --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS"
      --compiler_flags="--output_wrapper=(function() {%output%})();" 
      --compiler_jar=./jar/compiler.jar
      --namespace="myproject.start" 
      --output_file=./client/js/compiled.js
      --output_mode=compiled
      --root=client/js'
    
    Q.when (muffin.exec command)[1], (result) ->
      sys.print result[0]
