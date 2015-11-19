# Mechanisms in Rust

## Introduction

We'll explain mechanisms through examples.

## Mechansims As Fundamental Types

> Every fundamental type is a mechanism that can convert it's value to any other fundamental type: including a mechanism.

The interface (trait) of all mechanisms is the same and defined as follows:

```rust
trait Mechanism {
    fn eval_mech(&self) -> &Mechanism;
    fn eval_i64(&self) -> i64;
    fn eval_f64(&self) -> f64;
    fn eval_str(&self) -> String;
    fn eval_bool(&self) -> bool;
    fn eval_char(&self) -> char;
    fn eval_vec_i64(&self) -> Vec<i64>;
    fn eval_vec_f64(&self) -> Vec<f64>;
    fn eval_vec_str(&self) -> Vec<String>;
    fn eval_vec_bool(&self) -> Vec<bool>;
}
```


A mechanism maps from itself to one or more fundamental data types through evaluation.

### The Int Mechanism

A concrete implementation: the *Int* mechanism.

``` rust
struct Int {
    v: i64,
}

impl Mechanism for Int {
    fn eval_mech(&self) -> &Mechanism { self as &Mechanism }
    fn eval_i64(&self) -> i64 { self.v }
    fn eval_f64(&self) -> f64 { self.v as f64 }
    fn eval_str(&self) -> String { self.v.to_string() }
    fn eval_bool(&self) -> bool { self.v != 0 }
    fn eval_char(&self) -> char { (self.v as u8) as char }
    fn eval_vec_i64(&self) -> Vec<i64> { vec![self.eval_i64()] }
    fn eval_vec_f64(&self) -> Vec<f64> { vec![self.eval_f64()] }
    fn eval_vec_str(&self) -> Vec<String> { vec![self.eval_str()] }
    fn eval_vec_bool(&self) -> Vec<bool> { vec![self.eval_bool()] }
}
```
Instances are created using, one or more, factories.

``` rust
fn int64(val: i64) -> Int {
    return Int { v: val }
}
```

Example usage ([try it Out](http://is.gd/CjLEci)):

``` rust
fn main() {
    let mech = int64(65);

    println!("eval_i64: {}, eval_f64: {}, eval_str: \"{}\", eval_bool: {}, eval_char: '{}', eval_vec_i64: {:?}, eval_vec_f64: {:?}, eval_vec_str: {:?}, eval_vec_bool: {:?}, eval_mech.eval_i64: {}\n",
        mech.eval_i64(),
        mech.eval_f64(),
        mech.eval_str(),
        mech.eval_bool(),
        mech.eval_char(),
        mech.eval_vec_i64(),
        mech.eval_vec_f64(),
        mech.eval_vec_str(),
        mech.eval_vec_bool(),
        mech.eval_mech().eval_i64(),
    );

}
```

Notice that in the following code, mech is an instance of a mechanism that has not yet been evaluated.


``` rust
...
let mech = int64(65);
...
```

Evaluation happens when one of the evaluator functions (eval_*) on the mechanism is invoked.

## Mechanisms Are Algorithms

Algorithms are defined using mechanisms.

### The Add Mechanism

``` rust
struct Add<LM, RM> {
    l: LM,
    r: RM,
}

impl<LM, RM> Mechanism for Add<LM, RM> where LM: Mechanism, RM: Mechanism {
    fn eval_mech(&self) -> &Mechanism { self as &Mechanism }
    fn eval_i64(&self) -> i64 { self.l.eval_i64() + self.r.eval_i64() }
    fn eval_f64(&self) -> f64 { self.l.eval_f64() + self.r.eval_f64() }
    fn eval_str(&self) -> String { format!("({} + {})", self.l.eval_str(), self.r.eval_str()) }
    fn eval_bool(&self) -> bool { self.eval_i64() != 0 }
    fn eval_char(&self) -> char { (self.eval_i64() as u8) as char }
    fn eval_vec_i64(&self) -> Vec<i64> { vec![self.eval_i64()] }
    fn eval_vec_f64(&self) -> Vec<f64> { vec![self.eval_f64()] }
    fn eval_vec_str(&self) -> Vec<String> { vec![self.eval_str()] }
    fn eval_vec_bool(&self) -> Vec<bool> { vec![self.eval_bool()] }
}
```

Example usage ([try it Out](http://is.gd/YKr1Vq)):

``` rust
fn main() {

    let mech = Add {
        l: Int64 { v: 2 },
        r: Int64 { v: 5 },
    };

    println!("eval_i64: {}, eval_f64: {}, eval_str: {}",
        mech.eval_i64(),
        mech.eval_f64(),
        mech.eval_str() );
}
```
An algorithm is implemented for each primitive datatype. Mappings that aren't supported result in an exception or error.

Mapping is domain specific. For example, addition of a numeric falls within algebra but addition of a string does not. In this case, we arbitrarily decided to return the mathmatical equation.

``` rust
fn eval_str(&self) -> String {
    format!("({} + {})", self.l.eval_str(), self.r.eval_str())
}
```


## Mechanisms And Loops

Emitting type mechanisms are used in place of language looping syntax for generating sequences and ranges.

An emitter returns the next element from a source for each invocation of the emitter mechanism.



struct EmitNumRange<MIN, MAX, BY, RPT> {
    cur: i64,
    min: MIN,
    max: MAX,
    by: BY,
    rpt: RPT
}

impl<MIN, MAX, BY, RPT> Mechanism for EmitNumRange<MIN, MAX, BY, RPT> where MIN: Mechanism, MAX: Mechanism, BY: Mechanism, RPT: Mechanism {
    fn eval_i64(&self) -> i64 {
        self.cur
    }
    fn eval_f64(&self) -> f64 {
        self.cur as f64
    }
    fn eval_str(&self) -> String {
        self.cur.to_string()
    }
}



## Mechanisms Are Higher Order Functions



/*

(add int(3) int(4))

(add float(3) float(4))

(add str("4") str(4))

(add bool(true) bool(false))

*/




trait Mechanism {
    fn eval_i64(&self) -> i64;
    fn eval_f64(&self) -> f64;
    fn eval_str(&self) -> String;
    fn eval_bool(&self) -> bool;
    fn eval_char(&self) -> char;
    fn eval_vec_i64(&self) -> Vec<i64>;
    fn eval_vec_f64(&self) -> Vec<f64>;
    fn eval_vec_str(&self) -> Vec<String>;
    fn eval_vec_bool(&self) -> Vec<bool>;
}

struct Int {
    v: i64,
}

impl Mechanism for Int {
    fn eval_i64(&self) -> i64 { self.v }
    fn eval_f64(&self) -> f64 { self.v as f64 }
    fn eval_str(&self) -> String { self.v.to_string() }
    fn eval_bool(&self) -> bool { self.v != 0 }
    fn eval_char(&self) -> char { (self.v as u8) as char }
    fn eval_vec_i64(&self) -> Vec<i64> { vec![self.eval_i64()] }
    fn eval_vec_f64(&self) -> Vec<f64> { vec![self.eval_f64()] }
    fn eval_vec_str(&self) -> Vec<String> { vec![self.eval_str()] }
    fn eval_vec_bool(&self) -> Vec<bool> { vec![self.eval_bool()] }
}

fn int(val: i64) -> Int {
    return Int { v: val }
}

fn main() {
    let mech = int(65);

    println!("eval_i64: {}, eval_f64: {}, eval_str: \"{}\", eval_bool: {}, eval_char: '{}', eval_vec_i64: {:?}, eval_vec_f64: {:?}, eval_vec_str: {:?}, eval_vec_bool: {:?}",
        mech.eval_i64(),
        mech.eval_f64(),
        mech.eval_str(),
        mech.eval_bool(),
        mech.eval_char(),
        mech.eval_vec_i64(),
        mech.eval_vec_f64(),
        mech.eval_vec_str(),
        mech.eval_vec_bool(),
    );
}

* It may seem like primitive data type mechanisms introduce ineffeciency into the language. They are mostly used for testing.
