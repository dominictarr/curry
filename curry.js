var slice = Array.prototype.slice;
var toArray = function(a){ return slice.call(a) }

var createFn = function(fn, args){
    var arity = fn.length - args.length;

    if ( arity === 0 )  return function curriedFn(){ return processInvocation(fn, argify(args, arguments)) };
    if ( arity === 1 )  return function curriedFn(a){ return processInvocation(fn, argify(args, arguments)) };
    if ( arity === 2 )  return function curriedFn(a,b){ return processInvocation(fn, argify(args, arguments)) };
    if ( arity === 3 )  return function curriedFn(a,b,c){ return processInvocation(fn, argify(args, arguments)) };
    if ( arity === 4 )  return function curriedFn(a,b,c,d){ return processInvocation(fn, argify(args, arguments)) };
    if ( arity === 5 )  return function curriedFn(a,b,c,d,e){ return processInvocation(fn, argify(args, arguments)) };
    if ( arity === 6 )  return function curriedFn(a,b,c,d,e,f){ return processInvocation(fn, argify(args, arguments)) };
    if ( arity === 7 )  return function curriedFn(a,b,c,d,e,f,g){ return processInvocation(fn, argify(args, arguments)) };
    if ( arity === 8 )  return function curriedFn(a,b,c,d,e,f,g,h){ return processInvocation(fn, argify(args, arguments)) };
    if ( arity === 9 )  return function curriedFn(a,b,c,d,e,f,g,h,i){ return processInvocation(fn, argify(args, arguments)) };
    if ( arity === 10 ) return function curriedFn(a,b,c,d,e,f,g,h,i,j){ return processInvocation(fn, argify(args, arguments)) };
    return createEvalFn(fn, args, arity);
}

var createEvalFn = function(fn, args, arity){
    var argList = makeArgList(arity);
    var fnStr = '(function curriedFn(' + argList + '){ return processInvocation(fn, argify(args, arguments)); })';
    return eval(fnStr);
}

var argify = function(args1, args2){
    return args1.concat(toArray(args2));
}

var makeArgList = function(len){
    var a = [];
    for ( var i = 0; i < len; i += 1 ) a.push('a' + i.toString());
    return a.join(',');
}

var processInvocation = function(fn, args){
    if ( args.length > fn.length ) return fn.apply(null, args.slice(0, fn.length));
    if ( args.length === fn.length ) return fn.apply(null, args);
    return createFn(fn, args);
}

var curry = function(fn){
    return createFn(fn, []);
};

module.exports = curry;
