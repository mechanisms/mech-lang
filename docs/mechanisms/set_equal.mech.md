# = Mechanism

The set equals operator takes the value located on the right side and sets it to the left side.

## TODO

Need to figure out c language template code for setting values on the right and left based on the
primitive data type on the right.

We currently get the right side mechanism but we don't exactly know what trait we should operate on and what we should do with it.

For example:

* if we have ```x = 1``` then we should store the literal value 1 in x.
* if we have ```x = left || right```, should we defer execution of the ```or``` mechanism OR do we store the ```or``` mechanism. Perhaps ```=``` is non-deferred and ```===``` is deferred? Or something like that.

## Code
```js
=: [
	(left, right): {},
	mech: [
		c_lang { left = right; }
	]
]
```

## Example Usage
```js
x = 1;
```
