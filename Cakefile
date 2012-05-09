muffin = require 'muffin'
sys = require 'sys'
Q = require 'q'


task 'Q1', 'q test', ->
    muffin.exec 'sleep 3 && touch /tmp/test1'
    
task 'Q2', 'q test', ->
    muffin.exec 'sleep 4 && touch /tmp/test2'
    
task 'Q', 'q test', ->
    Q.when Q.all([
        (invoke 'Q1')[1]
        (invoke 'Q2')[1]
    ]), (result) ->
      Q.when (muffin.exec 'ls /tmp')[1], (result) ->
        sys.print result[0]
  
      
     
      
task 'templates', 'convert soy into js', ->
  q = muffin.exec 'java'
  
  for key in q[1]
    sys.puts key
  
  
    
task 'builder', 'building closure library script', ->
  Q.when Q.all([
      (invoke 'templates')[1]
  ]), (result) ->
    sys.puts result[1]
    
    command = 'python closure-library/closure/bin/build/closurebuilder.py
      --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS"
      --compiler_flags="--output_wrapper=(function() {%output%})();" 
      --compiler_jar=./jar/compiler.jar
      --namespace="myproject.start" 
      --output_mode=compiled
      --root=closure-library/
      --root=client/'

    Q.when (muffin.exec command)[1], (result) ->
      sys.print result[0]