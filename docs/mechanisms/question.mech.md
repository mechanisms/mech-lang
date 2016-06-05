# ? Mechanism

A conditional operator.

## TODO

Figure out how to call the mechanism behavior of a left_action and/or right_action in the C code template.

## Code

```js
?: [
	(condition, left_action, right_action): {},
	bool: [
		c_lang {
			if (condition.bool) {
				return left_action.mech();
			} else {
				return right_action.mech();
			}
		}
	]
]
```

## Example Usage

```js
true ? write('true') : write('false')
```
