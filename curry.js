module.exports = curry

function curry (){
  var left, right, func, self

  for(key in arguments){
    var value = arguments[key]
    
    if(!right && value instanceof Array){
      if (!func)  
        left = value
      else
        right = value
    } else if (!func && value instanceof Function)
      func = value
    else 
      self = value
  }
  return function (){
   return func.apply(self,append([].concat(left || []),arguments).concat(right || [])) 
  }
}
function append (a,args){
  for (i in args) 
    a.push(args[i])
  return a 
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

