# emit Mechanism

An emitter returns the next item from an array of items when a primitive trait is accessed (```byte```, ```char```, ```str```, ```i64```, etc.).

## Code
```js
emit: [
	(item): {},
	position: 0,
	reset: { position = 0 },
	current: { item[position] }
	next: { at_end ? item[position] : item[++position] },
	prior: { at_beginning ? item[position] : item[--position] },
	byte: { next.byte },
	char: { next.char },
	str: { next.str },
	i64: { next.i64 },
	length: { value.length },
	at_beginning: { 0 == position },
	at_end: { position == item.length }
]
```

## Example Usage

```js
x = emit([1,2,3]);

x_01 = x.next; // contains 1
x_02 = x.next; // contains 2
x_03 = x.current; // contains 2
x_04 = x.next; // contains 3
x_05 = x.next; // contains 3

```



## Mechanism Syntax Explained

The syntax for a mechanism is as follows:

```js
<mechanism-name>: [
	(param_01, param_02 ..., param_n): { code body },
	trait_01: { code body },
	trait_02: { code body },
	...
	trait_n: { code body },
]
```

### Mechanism Body

We use the array ```[]``` symbol for the body because a mechanism is an array/aggregate of traits. Traits are comma separated and the last trait also has a comma.

### Constructor

The "constructor" for a mechanism is ```(param_01, param_02 ..., param_n)```. By default, the parameters become traits of the mechanism itself using the parameter name. In the ```emit``` mechanism above, ```item``` becomes a trait of ```emit``` accessible from other traits within the mechanism as seen by the ```next``` trait.

The code body of the constructor is empty in the ```emit``` mechanism but can contain code that is invoked during mechanism creation: the execution is **not** deferred.

### Traits

The syntax for a trait is ```trait_02: { code body },```.

### Native Language Template Traits

Where the rubber meets the road, we provide native language templates. They are declared similar to a trait but require the ```[]```.

```js
<mechanism-name>: [
	(param_01, param_02 ..., param_n): { code body },
	trait_01:[
		c_lang { imbedded c 'template' code },
		cpp_lang { imbedded c++ 'template' code },
		rust_lang { imbedded rust 'template' code},
	],
	trait_02: { code body },
	...
	trait_n: { code body },
]
```

This embedded code is used by the compiler to generate the native language code. Note that **most** mechanisms will not have imbedded language code.

The mechanism interpreter ignores the code contained within the *_lang syntax and simply passes it to the compiler.
