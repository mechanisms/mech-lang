# The Global Program Mechanism

The Program mechansim is, by convention, global in scope.

- Only one instance per application
    - **Warning:** The instance is shared between threads
- Anything not declared within a scope (see the scoping operator {} )is implicty within scope of the Program mechanism instance

The following is an f64 mechanism is implicty defined within the program mechanism scope.

```c
f64: [
    primitive: { double },
    i64: { 1 },
    f64: { 1.0 },
]
```

or it could be explicity scoped:

```c
program: [
    scope 
    f64: [
        primitive: { double },
        i64: { 1 },
        f64: { 1.0 }
    ]
]
```
