
CURRY
=====

#curry function without anything *too clever*
#       ... because hunger is the finest spice


can curry left an right and pass in a context object in one easy call:
wrap you curry args in Arrays

    var fn = curry([left],function,[right],self)
    
calling `fn(x)` will stick x in between left and right curry ingredients.

# *left* and *right* are _*Arrays*_, and are _optional_.

i.e.

  var fn = curry(funx,[1,2,3])

is the same as

  var fn = curry([],funx,[1,2,3])

this makes `fn(X)` call `funx(X,1,2,3)`

##calling styles:

in all, there are 8 ways to call the function.

    curry([left],fn,[right])
    curry(fn,[right])
    curry([left],fn)
    curry(fn)

    curry([left],fn,[right],self)
    curry(fn,[right],self)
    curry([left],fn,self)
    curry(fn,self)

#full test coverage* for documented usuage!

    > expresso test/curry.expresso.js
