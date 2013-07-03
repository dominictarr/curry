CURRY
=====

A curry function without anything **too clever**
_(... because hunger is the finest spice)_

[![browser support](https://ci.testling.com/hughfdjackson/curry.png)](https://ci.testling.com/hughfdjackson/curry)

# install

```bash
npm install curry
```

# Usage

```javascript
//-- creating a curried function is pretty
//-- straight forward:
var add = curry(function(a, b){ return a + b });

//-- it can be called like normal:
add(1, 2) //= 3

//-- or, if you miss off any arguments,
//-- a new funtion that expects all (or some) of
//-- the remaining arguments will be created:
var add1 = add(1);
add1(2) //= 3;

//-- curry knows how many arguments a function should take
//-- by the number of parameters in the parameter list

//-- in this case, a function and two arrays is expected
//-- (fn, a, b).  zipWith will combine two arrays using a function:
var zipWith = curry(function(fn, a, b){
    return a.map(function(val, i){ return fn(val, b[i]) });
});

//-- if there are still more arguments required, a curried function
//-- will always return a new curried function:
var zipAdd = zipWith(add);
var zipAddWith123 = zipAdd([1, 2, 3]);

//-- both functions are usable as you'd expect at any time:
zipAdd([1, 2, 3], [1, 2, 3]); //= [2, 4, 6]
zipAddWith123([5, 6, 7]) //= [6, 8, 10]
```
