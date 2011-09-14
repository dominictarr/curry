//synct.js

//runs tests in the style of expresso

/*
  collects exports
//  check for setup, teardown, setupEach, teardownEach

  run each test passing in assert as the argument
*/

var assert = require('assert')

exports.run = run

function run (tests,reporter,done){
  for(var key in tests){
    try{
      tests[key](assert)
      reporter.test(key)    
    } catch (error){
      reporter.test(key,error)
    }
  }
  return function (){} //shutdown function
}
