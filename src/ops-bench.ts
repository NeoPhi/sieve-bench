import { readFileSync } from "node:fs";
import { Bench } from "tinybench";

const keys = readFileSync("./metaKV.sample100.txt").toString().split("\n");

const N = 10;
const M = 100;
const startIndex = Math.floor(Math.random() * keys.length);
console.log(`startIndex ${startIndex}`);

function exercise(cache) {
  let i = 0;
  let keyIndex = startIndex; // Math.floor(Math.random() * keys.length);
  while (i < M) {
    const key = keys[keyIndex];
    const value = cache.get(key);
    if (!value) {
      cache.set(key, String(key));
    }
    i += 1;
    keyIndex = (keyIndex + 1) % keys.length;
  }
}

import { Sieve as SieveMapEntry } from "./sieve-map-entry";
import { Sieve as SieveMapSet } from "./sieve-map-set";
import { Sieve as SieveUint } from "./sieve-uint";

async function ops() {
  const bench = new Bench();
  bench
    .add("SieveUint", () => exercise(new SieveUint(N)))
    .add("SieveMapSet", () => exercise(new SieveMapSet(N)))
    .add("SieveMapEntry", () => exercise(new SieveMapEntry(N)));
  await bench.warmup();
  await bench.run();

  console.table(bench.table());
}

ops().finally(() => console.log("done"));
