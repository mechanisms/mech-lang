# loop Mechanism

Different mech-lang syntax using loops.

```c
loop(emitter, algorithm): [
	(_break): { false },
	break: { _break = true; },
	mech: {
		BP_01:
			(_break || emitter.at_end) ? {
				jump BP_02;
			} : {
				algorithm.mech;
				emitter.next;
				jump BP_01;
			}
		BP_02:
	}
]
```

```c
loop: [
	(emitter): {},
	(algorithm): {},
	(_break): { false },
	break: { _break = true; },
	mech: {
		BP_01:
			(_break || emitter.at_end) ? {
				jump BP_02;
			} : {
				algorithm.mech;
				emitter.next;
				jump BP_01;
			}
		BP_02:
	}
]
```

