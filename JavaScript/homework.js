'use strict'

function SetByArr(iterable) {
  this.arr = [];
  this.checkValues = [];
  for (let i = 0; i < iterable.length; i++) {
    if (this.checkValues.includes(iterable[i])) continue;
      this.checkValues.push(iterable[i]);
      this.arr.push(iterable[i]);
    }
}

SetByArr.prototype[Symbol.iterator] = function* () {
  yield* this.arr;
};

SetByArr.prototype.add = function (value) {
  if (Array.isArray(value)) {
      for (const i of value) {
        this.arr.push(i);
      }
      return;
    }
    this.arr.push(value);
};

SetByArr.prototype.clear = function () {
  this.arr = [];
};

SetByArr.prototype.has = function (value) {
  return this.arr.includes(value);
};

SetByArr.prototype.delete = function (value) {
  this.arr.splice(this.arr.indexOf(item), 1);
};

SetByArr.prototype.entries = function () {
  this.entriesArr = [];
    for (const i of this.arr) {
      this.entriesArr.push([i, i]);
    }
    return this.entriesArr;
};


const union = (s1, s2) => new Set([...s1, ...s2]);

const intersection = (s1, s2) => new Set(
  [...s1].filter(v => s2.has(v))
);

const difference = (s1, s2) => new Set(
  [...s1].filter(v => !s2.has(v))
);

const complement = (s1, s2) => difference(s2, s1);

// Usage

const cities1 = new SetByArr(['Beijing', 'Kiev']);
const cities2 = new SetByArr(['Kiev', 'London', 'Baghdad']);

const operations = [union, intersection, difference, complement];

const results = operations.map(operation => ({
  [operation.name]: operation(cities1, cities2)
}));

console.dir({ cities1, cities2 });
console.dir(results);
