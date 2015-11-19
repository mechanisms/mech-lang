

var emtArr = emit.emitFromArr([1,2,3,4,5],true);


var emtRan = emit.emitFromRange(1,20,2,true);


var emtAdd = math.add(emtArr,emtRan);


var mp = m.map(emtAdd, 10);




var emtRan2 = emit.emitFromRange(1,100000,emit.emitFromArr([1,2,3,4,5],true));

var emtAdd2 = math.add(null, emtRan2);

var redAdd2 = m.reduce(emtAdd2);


var mp2 = m.map(
math.add(
2,
emit.emitFromArr([1,2,3,4,5])
)
);


var map_reduce = m.reduce(
math.add(null,
math.add(2, emit.emitFromRange(1, 5, 1))
)
);


sp.cell("A:1", emit.emitFromRange(1, 30, 2));


sp.cell("A:2", m.reduce(
math.add(null,
math.add(2, sp.cellGet("A:1"))
)
)
);

sp.cellGet("A:2").go;

