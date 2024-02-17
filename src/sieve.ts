class Entry<V> {
  value: V;

  visited = false;

  constructor(value: V) {
    this.value = value;
  }
}

export class Sieve<K, V> {
  readonly #maxSize: number;

  readonly #map: Map<K, Entry<V>>;

  #iterator: IterableIterator<[K, Entry<V>]>;

  constructor(maxSize: number) {
    this.#maxSize = maxSize;
    this.#map = new Map();
    this.#iterator = this.#map.entries();
  }

  set(key: K, value: V) {
    const entry = this.#map.get(key);
    if (entry) {
      entry.value = value;
      entry.visited = false;
      return;
    }
    if (this.#map.size === this.#maxSize) {
      this.#evict();
    }
    this.#map.set(key, new Entry(value));
  }

  get(key: K): V | undefined {
    const entry = this.#map.get(key);
    if (entry) {
      entry.visited = true;
      return entry.value;
    }
    return undefined;
  }

  clear() {
    this.#map.clear();
  }

  #evict() {
    let doLoop = true;
    while (doLoop) {
      const { done, value } = this.#iterator.next();
      if (done) {
        this.#iterator = this.#map.entries();
      } else {
        const [key, entry] = value;
        if (entry.visited) {
          entry.visited = false;
        } else {
          this.#map.delete(key);
          doLoop = false;
        }
      }
    }
  }
}
