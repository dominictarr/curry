/* public */

module.exports = curry;

curry.to       = curry(to);
curry.adapt    = curry(adapt);
curry.adaptTo  = curry(adaptTo);

/* private */

// fn -> fn
//-- curries a function! <3
function curry(fn){
    return createFn(fn, [], fn.length);
}

// num, fn -> fn
//-- curries a function to a certain arity! <33
function to(arity, fn){
    return createFn(fn, [], arity);
}

// fn, [value] -> fn
//-- create a curried function, incorporating any number of
//-- pre-existing arguments (e.g. if you're further currying a function).
function createFn(fn, args, totalArity){
    var remainingArity = totalArity - args.length;

    switch (remainingArity) {
        case 0: return function(){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 1: return function(a){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 2: return function(a,b){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 3: return function(a,b,c){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 4: return function(a,b,c,d){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 5: return function(a,b,c,d,e){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 6: return function(a,b,c,d,e,f){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 7: return function(a,b,c,d,e,f,g){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 8: return function(a,b,c,d,e,f,g,h){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 9: return function(a,b,c,d,e,f,g,h,i){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 10: return function(a,b,c,d,e,f,g,h,i,j){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        default: return createEvalFn(fn, args, remainingArity);
    }

    // fn, [value] -> value
    //-- handle a function being invoked.
    //-- if the arg list is long enough, the function will be called
    //-- otherwise, a new curried version is created.
    function processInvocation(fn, argsArr, totalArity){
        argsArr = trimArrLength(argsArr, totalArity);

        if ( argsArr.length === totalArity ) return fn.apply(null, argsArr);
        return createFn(fn, argsArr, totalArity);


        function trimArrLength(arr, length){
            if ( arr.length > length ) return arr.slice(0, length);
            else return arr;
        }

    }

    // [value], arguments -> [value]
    //-- concat new arguments onto old arguments array
    function concatArgs(args1, args2){
        return args1.concat(toArray(args2));

        function toArray(a){ return slice.call(a) }
    }

    // fn, [value], int -> fn
    //-- create a function of the correct arity by the use of eval,
    //-- so that curry can handle functions of any arity
    function createEvalFn(fn, args, arity){
        var argList = makeArgList(arity);

        //-- hack for IE's faulty eval parsing -- http://stackoverflow.com/a/6807726
        var fnStr = 'false||' +
            'function(' + argList + '){ return processInvocation(fn, concatArgs(args, arguments)); }';
        return eval(fnStr);

        function makeArgList (len){
            var a = [];
            for ( var i = 0; i < len; i += 1 ) a.push('a' + i.toString());
            return a.join(',');
        }
    }
}

// fn -> fn
//-- adapts a function in the context-first style to
//-- a curried version. <333
function adapt(fn){
    return adaptTo(fn.length, fn);
}

// num, fn -> fn
//-- adapts a function in the context-first style
//-- to a curried version. <3333
function adaptTo(num, fn){
    return to(num, function(context){
        var args = tail(arguments).concat(context);
        return fn.apply(this, args);
    });

    function tail(a){ return slice.call(a, 1) }
}

var slice = Array.prototype.slice;