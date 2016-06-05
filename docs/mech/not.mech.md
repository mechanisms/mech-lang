# ! Mechanism

An operator that inverts the result of a boolean trait.

## Code
```js
!: [
	(item): {},
	bool: [
		c_lang { return !item.bool; }
	]
]
```

## Example Usage
```js
!true
!(true)
```
