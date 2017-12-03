'use strict';

const SetByArr = class {
  constructor(iterable) {
    this.arr = [];
    this.tryArr = [];
    for (let i = 0; i < iterable.length; i++) {
      if (this.tryArr.includes(iterable[i])) continue;
      this.tryArr.push(iterable[i]);
      this.arr.push(iterable[i]);
    }
  }
  get() {
    return this.arr;
  }
  add(value) {
    if (Array.isArray(value)) {
      for (const i of value) {
        this.arr.push(i);
      }
      return;
    }
    this.arr.push(value);
  }
  clear() {
    this.arr = [];
  }
  has(item) {
    return this.arr.includes(item);
  }
  delete(item) {
    this.arr.splice(this.arr.indexOf(item), 1);
  }
  entries() {
    this.entriesArr = [];
    for (const i of this.arr) {
      this.entriesArr.push([i, i]);
    }
    return this.entriesArr;
  }
};

const cities1 = new SetByArr(['Beijing', 'Kiev']);
const cities2 = new SetByArr(['Kiev', 'London', 'Baghdad']);

const union = (s1, s2) => new SetByArr([...s1.get(), ...s2.get()]);

const intersection = (s1, s2) => new SetByArr(
  [...s1.get()].filter(v => s2.has(v))
);

const difference = (s1, s2) => new SetByArr(
  [...s1.get()].filter(v => !s2.has(v))
);

const complement = (s1, s2) => difference(s2, s1);

const operations = [union, intersection, difference, complement];

const results = operations.map(operation => ({
  [operation.name]: operation(cities1, cities2).get()
}));

console.dir(results);
