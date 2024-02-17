import { readFileSync } from "node:fs";

const keys = readFileSync("./metaKV.sample100.txt").toString().split("\n");

const N = 100000;

function exercise(name, cache, complexReturn = false) {
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
  console.log(`${name} ${(hitCount / totalCount) * 100}%`);
}

import { Sieve as JSSieve } from "../js-sieve/dist/sieve.js";
import LRUMap from "../mnemonist/lru-map";
import SieveMap from "../mnemonist/sieve-map.js";
import { Sieve } from "./sieve.js";

exercise("Sieve", new Sieve(N));
exercise("js-sieve", new JSSieve(N), true);
exercise("SieveMap", new SieveMap(N));
exercise("LRUMap", new LRUMap(N));
