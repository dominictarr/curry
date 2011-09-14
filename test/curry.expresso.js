var assert = require('assert')
  , curry = require('curry')

  function x (a,b,c){
    return [a,b,c]
  }
  function y (a,b,c){
    return {self: this, args: [a,b,c]}
  }


function beF (x){
  assert.equal(typeof x,'function')
}
exports ['can curry a function'] = function (){
  var cx = curry([1],x)
  
  beF(cx)
  
  assert.deepEqual(cx(),[1,undefined,undefined])
  
  var xc = curry(x,[1])

  //if you don't pass in any args is does matter if it's left or right curried.
  beF(xc)
  
  assert.deepEqual(xc(),[1,undefined,undefined])

}

exports ['can curry a function, and args are in right place'] = function (){

  var cx = curry([1],x)

  beF(cx)

  assert.deepEqual(cx('X'),[1,'X',undefined])

  var xc = curry(x,[1])

  //if you don't pass in any args is does matter if it's left or right curried.
  beF(xc)

  assert.deepEqual(xc('X'),['X',1,undefined])

}


exports ['can curry a function, this passed in'] = function (){
  var s = {helo: 'asdfvnurowfn249r00jy4'}
  var ys = curry(y,s)
  var cys = curry([1],y,s)
  var ycs = curry(y,[2],s)
  var cycs = curry([1],y,[2],s)
  beF(ys)

  assert.deepEqual(ys('X'),{self: s, args: ['X',undefined,undefined]})


  assert.deepEqual(cys('X'),{self: s, args: [1,'X',undefined]})

  assert.deepEqual(ycs('X'),{self: s, args: ['X',2,undefined]})

  assert.deepEqual(cycs('X'),{self: s, args: [1,'X',2]})

/*
  that was easy!
*/

}

exports ['right curry'] = function (){
  
  function callback() {
//    assert.finish()
  }
  var fn = curry(x,['callback:',callback])
    , list = [1,2,3,4,5]
    , r = fn(list)
    
    assert.deepEqual(r,[list,'callback:',callback])
    assert.deepEqual(r[2],callback)
  r[2]()  
}


exports ['math'] = function () {

    assert.equal(
        curry([3], function (x,y) { return x * 2 + y })(4),
        3 * 2 + 4
    );

}
