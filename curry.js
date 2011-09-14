module.exports = curry

function curry (){
  var left, right, func, self

  for (var i = 0; i < arguments.length; i++) {
    var value = arguments[i]

    if (!right && Array.isArray(value))
      if (!func)
        left = value
      else
        right = value
    else if (!func && typeof value === 'function')
      func = value
    else
      self = value
  }
  return function() {
   return func.apply(self,append([].concat(left || []),arguments).concat(right || []))
  }
}
function append (a, args) {
  for (var i = 0; i < args.length; i++)
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

