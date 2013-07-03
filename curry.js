var slice = Array.prototype.slice;
var toArray = function(a){ return slice.call(a) }

var genFn = function(fn, args){
    return function(){
        var nextArgs = args.concat(toArray(arguments));
        if ( nextArgs.length > fn.length ) return fn.apply(null, nextArgs.slice(0, fn.length));
        if ( nextArgs.length === fn.length ) return fn.apply(null, nextArgs);
        else return genFn(fn, nextArgs);
    }
}
var curry = function(fn){
    return genFn(fn, []);
};

module.exports = curry;
