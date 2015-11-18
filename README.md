# mech-lang

A language based on mechanisms and traits.

## Getting Started

This project uses:

- [Flex and bison][flex_and_bison] to create a parser for the *mech-lang*.
- [Make][makefile-learn] to compile and build the *mech-lang*.

## Mechanism Declaration

Core to *mech-lang* are mechanisms.

* Mechansisms have a name and traits.
* Traits are used to define algorithms.

### 64 bit Float Mechanism Example

The following defines a "primitive" mechanism: a 64 bit integer mechanism.

```c
i64: [
    (prim_value): { 0 },
    i64.get: ml { prim_value },
    i64.set: { prim_value = value; },
    f64: [
        c { (double)prim_value; },
        cpp { (double)prim_value; }
    ]
]
```

- A **Mechanisms** has a:
    - **Name** - `i64` is the mechanism name followed by a `:`.
    - **Body** - Brackets `[T1, T2, ..., Tn]` contain traits which are comma seperated.
        - We use the array operator `[]` because a mechanism can be viewed as a list of traits.
- A **Trait** has a:
    - **Name** - `i64`, `f64` and `prim_value` are trait names.
    - `get` and `set` scope.
        - `i64.get` and `f64` define *get* scopes
            - By default, a trait is a getter so `get` is optional.
            - Logic in a `get` scope is executed when that scope is accessed.
        - `i64.set` defines a *set* scope. An implied parameter `value` is always provided for a set scope as can be seen with `prim_value = value;`
            - Logic in a `set` scope is executed when used on the left side of an `=` operator.
        - **Note:** We'll explain how to define the type of a trait later.
    - **Body** - Traits can be defined in multiple langauges so can have multiple bodies. By default, a traits language is the mech langauge (`ml`).
        - **MOST** tratis will be defined using the mech lanauge syntax.
            - Mechanisms used to help bison and flex will have langauge specific tratis. These should be few and far between.
        - `i64.get: ml { prim_value }` - Defines a getter for a trait named `i64` and simply returns the value `prim_value`. We could have also defined this as `i64.get: { prim_value }` or just `i64: { prim_value }`.
        - `f64: [...]` defines multiple trait bodies to cover multiple langauges. In this case we define a body for the *C langauge* and *C++ langauge*.
    - `(T1, T2, ...., Tn)` - A trait that receives one or more mechanism instances.Think of this as something like a constructor.

## Mechanism Instantiation

A mechansim instance is created using the instantiation operator ():

```c
    default_zero = i64();
    i64_two = i64(2);
```

- `default_zero` - An instance of a mechanism
- `i64` - The mechansim to instantiate
- `()` - Instantiation operator
    - **Note:** In our definition, we default our instantiation to 0.

## Mechanism Invocation

Mechanisms use [lazy evaluation][lazy_evaluation]. Evaluating a mechanism is done by accessing a trait using the evaluation operator (which is a period):

```c
    i64_two = i64(2);
    i64_two.i64; // evaluates as 2
    i64_two.f64; // evaluates as 2.0
```

You can also use an evaluation mechansism.

```c
    i64_two = i64(2);
    eval_i64(i64_two);
    eval_f64(i64_two);
```

- `eval_i64` - a mechanism that evaluates another mechanism using the i64 trait.
    - Notice we pass the `i64_two` mechanism instance to the evaluator to invoke the mechanism.
- **Note:** Evaluation mechanisms do not use lazy evaluation. They invoke as soon as you use them.


## Decisions

- [Project Structure][project-structure]: Looked good enough
- [][] - Use markdown for documentation.

[lazy_evaluation]: https://en.wikipedia.org/wiki/Lazy_evaluation
[flex_and_bison]: http://aquamentus.com/flex_bison.html
[makefile-intro]: https://www.youtube.com/watch?v=aw9wHbFTnAQ
[makefile-gnu]: https://www.gnu.org/software/make/manual/make.html
[makefile-learn]: https://github.com/mechanisms/makefile-learn

[project-structure]: http://hiltmon.com/blog/2013/07/03/a-simple-c-plus-plus-project-structure/


Mech langauge code:


```
{
  a = 4;
  b = 2;
  while (b != 0) {
    if (a > b) {
      a = a − b;
    } else {
      b = b − a;
    }
  }
  return a
}
```

becomes and AST-ish output that is "runnable"???

```
scope(
    [a(4)],
    scope(
        [b(2)],
        while (
            not (
                equal(b, 0)
            ),
            ifelse (
                gt(a,b),
                assign(a, sub(a,b)),
                assign(b, sub(b,a))
            )
        )
    )
)
```

compiled to C

```
{
    a = 4;
    {
        b = 2;
        while b != 0 {
            if ( a > b ) {
                a = a - b;
            } else {
                b = b - a;
            }
        }
    }
}
```

or maybe we solve it?

```
    a = 2;
```






