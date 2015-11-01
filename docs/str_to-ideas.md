# str_to Mechanism

Instead of for each loops, mech-lang uses *emitters*/*streams*.

We will need to define an emitter that let's us emit values.

```c
emit: [
	(value): {},
	(position): 0,
	reset: { position = 0; },
	next: { position++; },
	prior: { position--; },
	byte: { value[position].byte; },
	char: { value[position].char; },
	str: { value[position].str; },
	i64: { value[position].i64; },
	at_beginning: { 0 == position },
	at_end: { value[position] == value.empty; }
]
```

Things to note:

- The emitter doesn't need to worry about bounds checking. The value primitive will manage that for us by returning value.empty.
- We are able to emit on any primitive data type: byte, char, string, i64, etc. As such, we only need to define this **one** emitter.
- For any given primitive data type, we know it's empty value using `value.empty`. As such, we know we've finished emitting when `value[position] == value.empty;`.

We can use that emitter in conjunction with a loop to stream through the bytes.

```c
str_to: [
	(value): {},
	(result): {},
	(is_negative): { false },
	(emitter): { emit(value) },
	l64: {
		// ??? emitter.reset; // just in case we run str_to more than once.
		loop (emitter.byte) {
			case(emitter.byte) [
				45: { is_negative = true; },
				48..57: { result += ( emitter.byte - 48 ) * emitter.position; },
				default: { break; }
			]
			emitter.next;
		}
		is_negative.bool ? -result : result;
	}
]
```

A loop will continue until the emitter returns true for `at_end`.

Let's use str_to to define our primitive data type.


```c
str: [
	(value): { "" },
	empty: { '' },
	[]: [
		c { ... },
		cpp {
			if (pos > value.size()) {
				return empty;
			} else {
				return value[pos];
			}
		}
	],
	str: { value },
	l64: { str_to(value).l64; },
	i64: { str_to(value).i64; }
]
```




## Language Specific

Calling the associated method in any given language.

```c
// http://www.cplusplus.com/reference/string/stoi/
// http://www.cplusplus.com/reference/string/stol/
// http://www.tutorialspoint.com/c_standard_library/c_function_strtol.htm
// http://www.tutorialspoint.com/c_standard_library/c_function_strtol.htm

str_to [
	(value): {},
	l64: [
		cpp {
			return std::stol(value.s64, convert_using_base.i64); 
		},
		c {
			return strtol(value.s64, null, convert_using_base.i64); 		
		}
	],
	i64: [
		cpp {
			return std:stoi(value.s64, convert_using_base.i64); 
		},
		c {
			
			return strtol(value.s64, null, convert_using_base.i64); 
		},
		asym {
			// assembly
		}
	]
]
```

usage would be

```c
long result = str_to("1234").l64;
int result2 = str_to("1235").i64;
```
