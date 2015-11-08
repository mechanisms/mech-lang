# Mech-Lang Documentation

## Introduction

Documentation and source-code are one and the same in the Mech-lang. The file extension is ```*.mech.md```. As such, source, code is also markdown.

## Specifications

* Markdown fenced code blocks annotated with ```mech``` contain compilable source code.
* Fenced code blocks are concatenated in the order they are displayed.
* Fenced code blocks which are not annotated with ```mech``` are ignored.

## Example

A valid fenced code block:

```
 ```mech
 program(cli_params): {
 	mech: {
 		print "Hello world!";
 	}
 }.mech

 `` `
```
