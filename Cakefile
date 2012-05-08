sys = require 'sys'
{exec} = require 'child_process'
Q = require 'q'


task 'Q', 'q test', ->
  Q.all([      
    exec 'sleep 3 && touch /tmp/qtest1 && echo 111',
    exec 'sleep 3 && touch /tmp/qtest2 && echo 222'
  ]).spread ->
    exec 'ls -la /tmp', (error, stdout, stderr) ->
      sys.print if error? then stderr else stdout
      
task 'templates', 'convert soy into js', ->
  command = 'touch /tmp/test'
    
  exec command, (error, stdout, stderr) ->
      sys.print if error? then stderr else stdout
      
  command = 'ls -la /tmp'
    
  exec command, (error, stdout, stderr) ->
      sys.print if error? then stderr else stdout
      
      
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