#Creating a Programming-ish Language Without Using Parsers or Compilers

## Introduction

I recently gave a talk at [Forward JS](http://forwardjs.com/) on Mechanisms.

> Mechanisms can be viewed as self interpreted functions with state: no additional context at time of invocation (aka: parameterless invocation)

Someone, after the talk, walked up to me and said "So, you can basically create your own programming languages using Mechanisms in any other language."

It was a unique perspective on Mechanisms that I hadn't considered. I was further inspired by a recent post on Ycombinator: [How to Implement a Programming Language in JavaScript](https://news.ycombinator.com/item?id=9190778) by [Mihai Bazon](https://github.com/mishoo).

## Language Considerations

* Easy to learn (minimal number of abstractions)
* Inherently Reactive/Immediate Feedback
* Integrated testing/mocking
* Integrated Persistence
* Closures
* Most important: Easily define context (covered later)
* Alter/Change program at run time but still...
* Strongly typed
* Single fundamental data type
* No functions (replaced by mechanisms)
* Mechanisms implemented in a native language (C, Javascript, Java, etc.).
* Runs natively (No parsers or compilers)

## Language Description

### Fundamental Datatype

The language's fundamental data type will be a Mechanism. Examples being:

* loops (replaced with emitters)
* conditionals
* primitives
* scope/context
* persistence
* memory allocation/deallocation
* addition, subtraction, etc.
* closures (Yep, those are mechanisms too)
* variables
* boxed primitive data types

### Simple Grammar

A pseudo parsing expression grammar:

```
a} PROPERTY <- MECHANISM
b} PROPERTY <- MECHANISM (PROPERTY+)
c} PROPERTY <- (MECHANISM [PROPERTY*])
d} MECHANISM <- primitive
```

Primitives can be:

* Strings - Str(“Hello”)
* Floats - Flt(34.56)
* Longs - Lng(56)
* String Array - ArrStr("A", "B", "C")
* Float Array - ArrFlt(1, 2, 3, 4)
* Long Array - ArrLng(1, 2, 3, 4)
* Mechanism Array - ArrMech()

### Langauge by Example

```javascript

// comment

// Write Hello
Run(WriteLn(Str("Hello")))

// Write 24
RunLng(WriteLn(Add(2, Mul(3,4))))

// Write 24.0
RunFlt(WriteLn(Add(2, Mul(3,4))))

// Write (2 + (3 * 4))
RunStr(WriteLn(Add(2, Mul(3,4))))

// Write 1, 2, 3, 4, 5
Run(Write(Loop(Range(1,5,1))))

// Get Fib value at post 14
Run(Pick(Fib(), 14))

```

Output:

```
Hello
24
24.0
(2 + (3 * 4))
610

```
