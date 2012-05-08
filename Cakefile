muffin = require 'muffin'
sys = require 'sys'
Q = require 'q'


task 'Q1', 'q test', ->
    q1 = muffin.exec 'sleep 3 && touch /tmp/test1'
    q2 = muffin.exec 'sleep 4 && touch /tmp/test2'
    
    Q.when Q.all([q1[1], q2[1]]), (result) ->
        invoke 'Q2'
    
task 'Q2', 'q test', ->
    q = muffin.exec 'ls /tmp'
        
    Q.when q[1], (result) ->
      sys.print(result[0])
      sys.print(result[1])
  
      
     
      
task 'build', 'building closure library script', ->
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