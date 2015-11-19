# Delaying Invocation Without Closures Using Mechanisms

## Introduction

Delaying the invocation of of functions enables a new set of tools for developers to play with.

Mechanisms and emitters.



## Monad

Point is a function that Maps something into the context of something else.

point(context,item) {
  context.add(item);
  return context;
}

Bind is a function that takes something in a something.

bind(X.Y)
