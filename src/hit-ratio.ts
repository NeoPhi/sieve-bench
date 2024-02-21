import { readFileSync } from "node:fs";
import benchmark from "nodemark";

const keys = readFileSync("./metaKV.sample100.txt").toString().split("\n");

const N = 100000;

function exercise(name, cache, complexReturn = false) {
  let hitCount = 0;
  let missCount = 0;

  console.time(name);
  for (const key of keys) {
    const value = cache.get(key);
    if (complexReturn) {
      const [, found] = value;
      if (found) {
        hitCount += 1;
      } else {
        missCount += 1;
        cache.set(key, String(key));
      }
    } else {
      if (value) {
        hitCount += 1;
      } else {
        missCount += 1;
        cache.set(key, String(key));
      }
    }
  }

  const totalCount = hitCount + missCount;
  console.log(`${name} ${hitCount} ${(hitCount / totalCount) * 100}%`);
  console.timeEnd(name);
}

// import { Sieve as JSSieve } from "../js-sieve/dist/sieve.js";
// import LRUMap from "../mnemonist/lru-map";
// import SieveMap from "../mnemonist/sieve-map.js";
import { Sieve as SieveMapEntry } from "./sieve-map-entry";
import { Sieve as SieveMapSet } from "./sieve-map-set";
import { Sieve as SieveUint } from "./sieve-uint";

console.log(
  benchmark(() => exercise("SieveUint", new SieveUint(N))).toString(
    "milliseconds"
  )
);
console.log(
  benchmark(() => exercise("SieveMapSet", new SieveMapSet(N))).toString(
    "milliseconds"
  )
);
console.log(
  benchmark(() => exercise("SieveMapEntry", new SieveMapEntry(N))).toString(
    "milliseconds"
  )
);
// exercise("js-sieve", new JSSieve(N), true);
// exercise("SieveMap", new SieveMap(N));
// exercise("LRUMap", new LRUMap(N));
