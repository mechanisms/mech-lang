# || Mechanism

An boolean OR operator on a left and right trait.

## Code

```js
||: [
	(left, right): {},
	bool: [
		c_lang { return left.bool || right.bool }
	]
]
```

## Example Usage

```js
true || false
```
