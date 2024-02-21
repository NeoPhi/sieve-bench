export class Sieve<K, V> {
  readonly #maxSize: number;

  readonly #values: Map<K, V>;

  readonly #visited: Set<K>;

  #iterator: IterableIterator<K>;

  #result: IteratorResult<K>;

  constructor(maxSize: number) {
    this.#maxSize = maxSize;
    this.#values = new Map();
    this.#visited = new Set();
    this.#iterator = this.#values.keys();
    this.#result = this.#iterator.next();
  }

  set(key: K, value: V) {
    if (this.#values.has(key)) {
      this.#values.set(key, value);
      this.#visited.delete(key);
      return;
    }
    if (this.#values.size === this.#maxSize) {
      this.#evict();
    }
    this.#values.set(key, value);
  }

  get(key: K): V | undefined {
    if (this.#values.has(key)) {
      this.#visited.add(key);
    }
    return this.#values.get(key);
  }

  keys() {
    return this.#values.keys();
  }

  clear() {
    this.#values.clear();
    this.#visited.clear();
  }

  dump() {
    console.log(Array.from(this.#values.entries()));
    console.log(Array.from(this.#visited.keys()));
  }

  #evict() {
    let doLoop = true;
    while (doLoop) {
      const { done, value: key } = this.#result;
      // console.log(`CHECKING ${value}`);
      if (done) {
        this.#iterator = this.#values.keys();
      } else {
        if (this.#visited.has(key)) {
          this.#visited.delete(key);
        } else {
          // console.log(`EVICT ${key}`);
          this.#values.delete(key);
          doLoop = false;
        }
      }
      this.#result = this.#iterator.next();
    }
  }
}
