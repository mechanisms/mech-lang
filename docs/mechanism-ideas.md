# Mechanisms

A mechanism is an associative array of traits. In most languages, we would define types/classes using the `{}` scoping operator. Such as:

```cpp
class Person {
	// ...
}
```

However, since a mechanism is an array, we should use the `[]` operator for arrays:

```
bool: [
	trait1: {}, trait2:
]
```

