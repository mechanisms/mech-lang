# Primitives

The `primitive` mechanism is used by flex and bison to associate a trait's result to a language specific primitive.

For example, the bool trait should return a boolean primitive. In the *C lanauge*, this will be `char` and in *C++* this will be `bool`.

The resulting mechanism looks like this:

```c
primitive: [
	bool: [
		c: { char },
		cpp: { bool }
	],
	char: [
		c: { wchar },
		cpp: { wchar }
	],
	str:[
		c: { wchar* },
		cpp: { string }
	]
]
```

Another approach is to define primitives using a trait:

```c
bool: [
	primitive: [
		c: { char },
		cpp: { bool }
	]
]

char: [
	primitive: [
		c: { wchar },
		cpp: { wchar }
	]
]

str: [
	primitive: [
		c: { wchar* },
		cpp: { string }
	]
]
```

## Example Using true

`true` is a mechanism used to define true in multiple primitive datatypes.

```c
true: [
	bool: { 1 },
	char: { 't' },
	str: "true"
]
```

The bool trait is defined to return a `char` in *C* and bool in *C++*.

The mech-lang statement:

```c
x = true.bool;
```

becomes the following in *C*:

```c
char x = 1;
```

and the following in *C++*:

```cpp
bool x = true;
```

## Example False

```c
false: [
	bool: { 0 },
	char: { 'f' },
	str: "false"
]
```

Of course, we could define primitives for other languages too like java, ruby, etc.

# The Boolean Primitive

We still need to define the boolean primitive itself in mech lang.

```c
bool: [
	(value): {},
	value: { this.value },
	value.set: { this.value = value; }
	bool: { this.value }
]
```



```c
// Greater Than or Equal To
>=: [
	left: {},
	right: {},
	char: [
		c { left.char >= right.char }
	],
	bool: [
		c { left.bool >= right.bool }
	]
]
```


```c
// Value equality (not instance equals)
==: [
	left: {},
	right: {},
	char: [
		c { left.char == right.char }
	],
	bool: [
		c { left.bool == right.bool }
	]
]
```

```c
// Between
..: [
	(value) : {}
	(left): {}
	(right): {}
	bool: {
		left >= value && right <= value
	}
]
```

```c
// http://www.fileformat.info/info/unicode/category/Ll/list.htm
char: [
	(value): {},
	char: { value }
	is_lower: {
		switch char {
			[0x0060..0x007A, 0x00B5, 0x00DF..0x00FF]: true,
			default: false
		}
	}
]
```

```c
mech: [
	is_empty: false
]
```

```c
empty: [
	is_empty: true,
	bool: { -128 },
	char: { -128 }
]
```

```c
// Trait operates against 'value'
is_lower [
	bool: {

	}
]
```

```c
char: [
	char: { value },
]
```


// http://www.tutorialspoint.com/cprogramming/c_data_types.htm
