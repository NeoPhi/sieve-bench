import { readFileSync } from "node:fs";

const keys = readFileSync("./metaKV.sample100.txt").toString().split("\n");

const N = 100000;

function exercise(cache, complexReturn = false) {
  let hitCount = 0;
  let missCount = 0;

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
  console.log("HIT", hitCount, (hitCount / totalCount) * 100);
}

import { Sieve as JSSieve } from "../js-sieve/dist/sieve.js";
import LRUMap from "../mnemonist/lru-map";
import SieveMap from "../mnemonist/sieve-map.js";
import { Sieve } from "./sieve.js";

const options = new Map([
  ["Sieve", () => exercise(new Sieve(N))],
  ["JSSieve", () => exercise(new JSSieve(N), true)],
  ["SieveMap", () => exercise(new SieveMap(N))],
  ["LRUMap", () => exercise(new LRUMap(N))],
]);
options.forEach((runner, key) => {
  console.log(key);
  runner();
});
