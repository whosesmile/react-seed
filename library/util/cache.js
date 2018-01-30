// FIFO
class Cache {
  constructor(max = 20) {
    this.max = max;
    this.cache = {};
  }

  get(key) {
    return (this.cache[key] || {}).value;
  }

  set(key, value) {
    this.cache[key] = { value, stamp: Date.now() };
    let list = this.keys();
    if (list.length > this.max) {
      this.delete(list.sort((x, y) => y.stamp - x.stamp)[0]);
    }
  }

  has(key) {
    return this.cache[key];
  }

  delete(key) {
    delete this.cache[key];
  }

  clear() {
    this.cache = {};
  }

  keys() {
    return Object.keys(this.cache);
  }

  get size() {
    return this.keys().length;
  }
}

export default Cache;
