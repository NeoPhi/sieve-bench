import { deepStrictEqual } from "node:assert";
import { Sieve } from "./sieve-map-entry";

let sieve = new Sieve(7);
// DR: Prime the cache
sieve.set("A", "A");
sieve.set("B", "B");
sieve.set("C", "C");
sieve.set("D", "D");
sieve.set("E", "E");
sieve.set("F", "F");
sieve.set("G", "G");
// DR: Mark 3 as visited
sieve.get("A");
sieve.get("B");
sieve.get("G");
deepStrictEqual(
  new Set(sieve.keys()),
  new Set(["A", "B", "C", "D", "E", "F", "G"])
);
// DR: A and B should not be visited, C removed, H added
sieve.set("H", "H");
deepStrictEqual(
  new Set(sieve.keys()),
  new Set(["A", "B", "D", "E", "F", "G", "H"])
);
// DR: A and D should be visited, E removed, I added
sieve.get("A");
sieve.get("D");
sieve.set("I", "I");
deepStrictEqual(
  new Set(sieve.keys()),
  new Set(["A", "B", "D", "F", "G", "H", "I"])
);
// DR: B visited, F removed, J added
sieve.get("B");
sieve.set("J", "J");
deepStrictEqual(
  new Set(sieve.keys()),
  new Set(["A", "B", "D", "G", "H", "I", "J"])
);

sieve = new Sieve<string, string>(2);
sieve.set("a", "a");
sieve.get("a");
deepStrictEqual(new Set(sieve.keys()), new Set(["a"]));
sieve.set("c", "c");
deepStrictEqual(new Set(sieve.keys()), new Set(["a", "c"]));
sieve.set("b", "b");
deepStrictEqual(new Set(sieve.keys()), new Set(["a", "b"]));
sieve.set("c", "c");
deepStrictEqual(new Set(sieve.keys()), new Set(["b", "c"]));
