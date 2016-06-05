# emit Mechanism

An emitter returns a single item from an array of items when a primitive trait is accessed (```byte```, ```char```, ```str```, ```i64```, etc.).
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

## Code Test
