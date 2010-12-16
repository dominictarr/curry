module.exports = parse

function isArray(x){
  return (x instanceof Array) }
function isFunction(x){
  return (x instanceof Function) }
function curry (left,func,right,self){
  return function (){
   return func.apply(self,[].concat(left).concat(toArray(arguments)).concat(right)) } }
function toArray (args){
  var a = []
  for (i in args){
    a.push(args[i])
  }
  return a
}

function parse (a,b,c,d){
  var left, right, func, self
  left = right = func = self  = null

  for(key in arguments){
    var value = arguments[key]
    
    if(!right && isArray(value)){
      if(!left)
        left = value
      else
        right = value
    } else if (!func && isFunction(value)){
      left = left || []
      func = value
    } else {
      self = value
    }
  }
  right = right || []
  return curry(left,func,right,self)
}

    /*
    call styles:
    
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

