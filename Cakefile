muffin = require 'muffin'
sys = require 'sys'
Q = require 'q'


task 'Q1', 'q test', ->
    muffin.exec 'sleep 3 && touch /tmp/test1'
    
task 'Q2', 'q test', ->
    muffin.exec 'sleep 4 && touch /tmp/test2'
    
task 'Q', 'q test', ->
    Q.when Q.all [
        (invoke 'Q1')[1]
        (invoke 'Q2')[1]
    ], (result) ->
      Q.when (muffin.exec 'ls /tmp')[1], (result) ->
        sys.print(result[0])
        sys.print(result[1])
  
      
     
      
task 'templates', 'convert soy into js', ->
  command = 'java'
  
  muffin.exec command
  
    
task 'builder', 'building closure library script', ->
  command = 'python closure-library/closure/bin/build/closurebuilder.py
    --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS"
    --compiler_flags="--output_wrapper=(function() {%output%})();" 
    --compiler_jar=compiler.jar
    --namespace="myproject.start" 
    --output_mode=compiled
    --root=closure-library/
    --root=client/'

  exec command, (error, stdout, stderr) ->
      sys.print if error? then stderr else stdout