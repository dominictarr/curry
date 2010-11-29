



module.exports = parse

function isArray(x){
  return (x instanceof Array)
}
function isFunction(x){
  return (x instanceof Function)
}
function curry (left,func,right,self){
  return function (){
   return func.apply(self,[].concat(left).concat(toArray(arguments)).concat(right))
  }
}
function toArray (args){
  var a = []
  for (i in args){
    a.push(args[i])
  }
  return a
}

function parse (a,b,c,d){
  var left  = null
    , right = null
    , func  = null
    , self  = null
  
    /*
    curry([left],fn,[right])
    curry(fn,[right])
    curry([left],fn)
    curry(fn)

    calling styles:
    curry([left],fn,[right],self)
    curry(fn,[right],self)
    curry([left],fn,self)
    curry(fn,self)
    */

  if(isArray(a)) {
    left = a
    if(isFunction (b)) {
      func = b
      if(isArray(c)) {
        right = c
        self = d
      } else {
        right = []
        self = c
      }
    }
  } else if (isFunction (a)){
    left = []
    func = a
    if (isArray(b)) {
      right = b
      self = c
    } else { 
      right = [] 
      self = b
    }
  }

  return curry(left,func,right,self)
}


