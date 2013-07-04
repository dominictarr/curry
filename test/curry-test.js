var curry = require('../');
var a = require('assert');


describe('curry', function(){

    it('should curry in the haskell sense, taking the arity from the function', function(){
        var sum5 = function(a, b, c, d, e){ return a + b + c + d + e };
        var sum5C = curry(sum5);

        a.equal(sum5(1, 2, 3, 4, 5), sum5C(1)(2)(3)(4)(5));
    });

    it('should be pure - each new argument should not affect the overall list', function(){
        var add = curry(function(a, b){ return a + b });
        var add1 = add(1);
        var add2 = add(2);
        a.equal(add1(1), 2);
        a.equal(add1(2), 3);
        a.equal(add1(3), 4);
        a.equal(add1(4), 5);

        a.equal(add2(1), 3);
        a.equal(add2(2), 4);
        a.equal(add2(3), 5);
        a.equal(add2(4), 6);
    });

    it('should drop "extra" arguments', function(){
        var reportArgs = curry(function(a, b){ return [].slice.call(arguments) });

        a.deepEqual(reportArgs('a', 'b', 'c', 'd', 'e'), ['a', 'b']);
    });

    it('should allow multiple arguments to be passed at a time', function(){
        var sum3 = curry(function(a, b, c){ return a + b + c });

        a.equal(sum3(1, 2, 3), sum3(1, 2)(3));
        a.equal(sum3(1, 2, 3), sum3(1)(2, 3));
        a.equal(sum3(1, 2, 3), sum3(1)(2)(3));
    });
});
