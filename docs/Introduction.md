# Mech-Lang - Specifications

## Introduction

*Mech-lang* is a language based on mechanisms and traits.

## Documentation and Source Code

Documentation and source code are provided in the same file with the extenion ```.mech.md```.

This means source code is also markdown.

See Documentation for complete specefications.

# Purpose

To solve the scoped context problem in programming.

## Literals

An interpreter matchs literals to a primitive traits/things.

'''
-23 -> int(value)
23l -> long(value)
4.5 -> double(value)
'Hello' -> string(value)
'01/10/2010'd -> date(value)
23.8d -> decimal(value)
'''

### Primitives and Units

A primitive data type can have, associated with it, a unit

'''
-23 feet -> int_util(value, unit)
23l meters -> long_util(value, unit)
'''

etc.

# Primitive Datatypes

A primitive trait/thing is normal trait/thing but is also used within a trait/thing to to map implementation of an algorithm to a primitive trait/thing.

## Defining Primitive Datatypes Using Things/Traits

A datatype is defined in the same way as a trait/thing.

General case:

'''
name {
	properties

	.get.primitive_datatype {
		// algorithm to run when accessing the primitive datatype
	}

	.set.primitive_datatype {
		// algorithm to run when setting a primitive datatype
	}

}
'''

properties are a thing instance with a name.


Example:

'''
int {
	value
}
'''

## Defining Traits



## Matching Operators

Example: 23 + 4.5

23 is matched as a int primitive trait
4.5 is matched as a double primitive trait

+ is matched as a + primitive type

## Defining a Primitive Datatype

Primitive data type definitions.


'''
age = 23;
'''


'''
.create {
	int value;
}

int.int.get {
	return value;
}

int.str.get {
	// code to convert an integer to a string
}

int.long {
	value
}
'''

An algorithm is defined against one or more data structures. 


KeyWords? new/create/delete


Trait "name" (can be any characters, numbers, etc.) No white spaces.

```
algorithm_name.data_structure {
	language specific code????
}

// maps to ?????

// LETTER_ALL     [^0-9\s{}\.:]
// LETTER_NUM     [^\s{}\.:]
// IDENT2         ({LETTER_ALL}({LETTER_NUM})*)


// print:
// 	echo $(wildcard *.c)
// 	echo $(patsubst %.c,%.o,$(wildcard *.c))
// 	echo $(objects)

// test1: $(EXE) test1.mec
// 	./^ test1
// 	./test >test1.results
// 	diff test1.results test1.expected || exit 1

```


```
class Add {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	constructor(properties) {
		this.left = properties.left;
		this.right = properties.right;
	}

	get eval_i64() { return this.left + this.right; }
}

function add(left, right) {
	return new Add(left,right);
}
```

## Design Goals

- reactive
- always on
- supports strongly/loosely typed
- usable like a data structure
- easy to persist
- complete separation of mechanism from policy
- simpler "language"
- no longer a barrier between language, source-code
- multiple mental models
- not limited to von-neuman architecture
- scope can be different
- supports multiple paradigms
- minimize scope - keep context simple
- greatly simplified shared mutable state!
- Always in a usable state - no need for additional information.


