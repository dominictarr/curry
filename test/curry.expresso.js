var test = require('assert')

var describe = require('should').describe
//  , curry = require('curry@0.0.2')
//  , remapper = 
  , curry = require('curry')
//  , curry = new (require('remap/remapper'))(module, {curry: 'curry@0.0.2'}).require('curry')

  function x (a,b,c){
    return [a,b,c]
  }
  function y (a,b,c){
    return {self: this, args: [a,b,c]}
  }


function beF (x){
  x
    .should.be.a('function')
}
exports ['can curry a function'] = function (){
  var cx = curry([1],x)
  
  beF(cx)
  
  cx()
    .should.eql([1,undefined,undefined])

  var xc = curry(x,[1])

  //if you don't pass in any args is does matter if it's left or right curried.
  beF(xc)
  
  xc()
    .should.eql([1,undefined,undefined])

}

exports ['can curry a function, and args are in right place'] = function (){
  
  var cx = curry([1],x)
  
  beF(cx)
  
  cx('X')
    .should.eql([1,'X',undefined])

  var xc = curry(x,[1])

  //if you don't pass in any args is does matter if it's left or right curried.
  beF(xc)
  
  xc('X')
    .should.eql(['X',1,undefined])
}


exports ['can curry a function, this passed in'] = function (){
  var s = {helo: 'asdfvnurowfn249r00jy4'}
  var ys = curry(y,s)
  var cys = curry([1],y,s)
  var ycs = curry(y,[2],s)
  var cycs = curry([1],y,[2],s)
  beF(ys)
  
  ys('X')
    .should.eql({self: s, args: ['X',undefined,undefined]})

  cys('X')
    .should.eql({self: s, args: [1,'X',undefined]})

  ycs('X')
    .should.eql({self: s, args: ['X',2,undefined]})

  cycs('X')
    .should.eql({self: s, args: [1,'X',2]})

/*
  that was easy!
*/

}

exports ['right curry'] = function (){
  
  function callback() {
//    test.finish()
  }
  var fn = curry(x,['callback:',callback])
    , list = [1,2,3,4,5]
    , r = fn(list)
    
    test.deepEqual(r,[list,'callback:',callback])
    test.deepEqual(r[2],callback)
  r[2]()  
}

