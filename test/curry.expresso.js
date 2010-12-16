
var describe = require('should').describe
  , curry = require('curry')

  function x (a,b,c){
    return [a,b,c]
  }
  function y (a,b,c){
    return {self: this, args: [a,b,c]}
  }


function beF (x){
  describe(x,"result of curry()")
    .should.be.a('function')
}
exports ['can curry a function'] = function (test){
  var cx = curry([1],x)
  
  beF(cx)
  
  describe(cx(),"result on x(), left curried with first arg")
    .should.eql([1,undefined,undefined])

  var xc = curry(x,[1])

  //if you don't pass in any args is does matter if it's left or right curried.
  beF(xc)
  
  describe(xc(),"result on x(), left curried with first arg")
    .should.eql([1,undefined,undefined])

}

exports ['can curry a function, and args are in right place'] = function (test){
  
  var cx = curry([1],x)
  
  beF(cx)
  
  describe(cx('X'),"result on x(\'X\'), left curried with first arg")
    .should.eql([1,'X',undefined])

  var xc = curry(x,[1])

  //if you don't pass in any args is does matter if it's left or right curried.
  beF(xc)
  
  describe(xc('X'),"result on x(\'X\'), left curried with first arg")
    .should.eql(['X',1,undefined])
}


exports ['can curry a function, this passed in'] = function (test){
  var s = {helo: 'asdfvnurowfn249r00jy4'}
  var ys = curry(y,s)
  var cys = curry([1],y,s)
  var ycs = curry(y,[2],s)
  var cycs = curry([1],y,[2],s)
  beF(ys)
  
  describe(ys('X'),"result on y(\'X\'), curried with self")
    .should.eql({self: s, args: ['X',undefined,undefined]})

  describe(cys('X'),"result on y(\'X\'), left curried with self")
    .should.eql({self: s, args: [1,'X',undefined]})

  describe(ycs('X'),"result on y(\'X\'), right curried with self")
    .should.eql({self: s, args: ['X',2,undefined]})

  describe(cycs('X'),"result on y(\'X\'), left right curried with self")
    .should.eql({self: s, args: [1,'X',2]})

/*
  that was easy!
*/

}


exports ['right curry'] = function (test){
  
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

