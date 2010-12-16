module.exports = parse

function curry (left,func,right,self){
  return function (){
   return func.apply(self,concatArgs([].concat(left),arguments).concat(right)) 
  }
}

function parse (a,b,c,d){
  var left, right, func, self

  for(key in arguments){
    var value = arguments[key]
    
    if(!right && value instanceof Array){
      if(!left)
        left = value
      else
        right = value
    } else if (!func && value instanceof Function){
      left = left || []
      func = value
    } else {
      self = value
    }
  }
  right = right || []
  return curry(left,func,right,self)
}

function concatArgs (a,args){
  for (i in args) a.push(args[i])
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

