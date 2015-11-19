# Mechanisms and The Scoped-Context Problem

One of the hardest things to do in computer science is provide context to algorithms while also limiting scope.

> **Scope** - the extent of the area or subject matter that something deals with or to which it is relevant.

> **Context** - the circumstances that form the setting for an event, statement, or idea, and in terms of which it can be fully understood and assessed.

## The Scoped-Context Problem

### Paramaterized Functions

The go to solution to the scoped-context problem is **providing context, at time of algorithm invocation, via parameters**.

```javascript
function add(left, right) {
  return left + right;
}

// Provide context and Invoke
console.log(add(5,6));

```

At time of invocation:

* the parameters *left* and *right* provided the context
* the function *add* provides limited scope (using the { and } scoping mechanism)

This solves the scoped-context problem for the add algorithm.

**However**, the responsibility of providing that context is now **pushed to the parent caller of *add***. Not only does the parent caller have to worry about it's own context but *add's* context too.

Abstractions like dependency injection/auto wiring, stateful objects, paramaterized sub-routines, free monads, currying, closures, singletons and variables provide ways to deal with the scoped-context problem but at a cost of additional source code complexity.

## Quick Introduction to Mechanisms

A Mechanism is a [self-interpreting](https://en.wikipedia.org/wiki/Interpreter_%28computing%29#Self-interpreter) function and a [primitive datatype](https://en.wikipedia.org/wiki/Primitive_data_type) which requires no additional context at time of invocation.

Let's look at an add mechanism

```javascript
function AddF() {};
function add(left,right) {
  var f = Object.create(AddF.prototype);
	f._l = left;
	f._r = right;
	return f;
}
AddF.prototype = Object.create(Object.prototype, {
  goNum: {
    get: function() {
      return this._l.goNum + this._r.goNum;
    }
  },
  goStr: {
    enumerable: false,
    get: function() {
      return "(" + this._l.goStr + " + " + this._r.goStr + ")";
    }
  }
});
```

Let's compose an instance of an add mechanism.

```javascript
// context provided at time of composition
var addIt = add(num(3),num(5));
```
The variable *addIt* is **not** the result of invoking '3 + 5' but instead an instance of an add mechanism.

We can invoke the mechanism instance without any additional context at any time in our program.

```javascript
// invoke without any additional context
addIt.goNum; // returns 8
addIt.goStr; // returns the string (3 + 5)
evalNum(addIt); // Invoke the mechanism using an evaluator mechanism
```

# Mechansims And The Scoped-Context Problem
