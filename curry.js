var slice = Array.prototype.slice;
var toArray = function(a){ return slice.call(a) }

// fn, [value] -> fn
//-- create a curried function, incorporating any number of
//-- pre-existing arguments (e.g. if you're further currying a function).
var createFn = function(fn, args){
    var arity = fn.length - args.length;

    switch (arity) {
        case 0: return function (){ return processInvocation(fn, argify(args, arguments)) };
        case 1: return function (a){ return processInvocation(fn, argify(args, arguments)) };
        case 2: return function (a,b){ return processInvocation(fn, argify(args, arguments)) };
        case 3: return function (a,b,c){ return processInvocation(fn, argify(args, arguments)) };
        case 4: return function (a,b,c,d){ return processInvocation(fn, argify(args, arguments)) };
        case 5: return function (a,b,c,d,e){ return processInvocation(fn, argify(args, arguments)) };
        case 6: return function (a,b,c,d,e,f){ return processInvocation(fn, argify(args, arguments)) };
        case 7: return function (a,b,c,d,e,f,g){ return processInvocation(fn, argify(args, arguments)) };
        case 8: return function (a,b,c,d,e,f,g,h){ return processInvocation(fn, argify(args, arguments)) };
        case 9: return function (a,b,c,d,e,f,g,h,i){ return processInvocation(fn, argify(args, arguments)) };
        case 10: return function (a,b,c,d,e,f,g,h,i,j){ return processInvocation(fn, argify(args, arguments)) };
        default: return createEvalFn(fn, args, arity);
    }
}

// [value], arguments -> [value]
//-- concat new arguments onto old arguments array
var argify = function(args1, args2){
    return args1.concat(toArray(args2));
}

// fn, [value], int -> fn
//-- create a function of the correct arity by the use of eval,
//-- so that curry can handle functions of any arity
var createEvalFn = function(fn, args, arity){
    var argList = makeArgList(arity);

    //-- hack for IE's faulty eval parsing -- http://stackoverflow.com/a/6807726
    var fnStr = 'false||' +
                'function curriedFn(' + argList + '){ return processInvocation(fn, argify(args, arguments)); }';
    return eval(fnStr);
}

var makeArgList = function(len){
    var a = [];
    for ( var i = 0; i < len; i += 1 ) a.push('a' + i.toString());
    return a.join(',');
}

// fn, [value] -> value
//-- handle a function being invoked.
//-- if the arg list is long enough, the function will be called
//-- otherwise, a new curried version is created.
var processInvocation = function(fn, args){
    if ( args.length > fn.length ) return fn.apply(null, args.slice(0, fn.length));
    if ( args.length === fn.length ) return fn.apply(null, args);
    return createFn(fn, args);
}

// fn -> fn
//-- curries a function! <3
var curry = function(fn){
    return createFn(fn, []);
};

module.exports = curry;
