import { HashMap } from "./index.js";

const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
console.log("Length before updating values: " + test.length()); // Will be 12
test.set('apple', 'green');
test.set('frog', 'red');
test.set('ice cream', 'vanilla');
console.log("Length after: " + test.length()); // Still 12 as only updating existing keys
test.set('moon', 'silver'); // Will trigger rehashing so capacity doubles -> 32, but all entries are retained after rehashing.
console.log("Capacity after rehashing: " + test.capacity); // Should be 32.
console.log("Values after rehashing: " + test.values()) // Should contain all values minus any duplicates
console.log("Keys: " + test.keys()) // Should contain all keys
console.log("All entries: " + test.entries()) // Will display all entries
test.clear();
console.log("Length after clearing: " + test.length());  // Should be 0 entries but retain doubled capacity
console.log("No entries left" + test.entries());