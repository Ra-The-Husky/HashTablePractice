const sha256 = require("js-sha256");

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  constructor(numBuckets = 4) {
    this.data = new Array(numBuckets).fill(null);
    this.capacity = numBuckets;
    this.count = 0;
  }

  hash(key) {
    const shaKey = sha256(key).slice(0, 8);
    return parseInt(shaKey, 16);
  }

  hashMod(key) {
    return this.hash(key) % this.capacity;
  }

  insertNoCollisions(key, value) {
    if (this.data[this.hashMod(key)]) {
      throw new Error("hash collision or same key/value pair already exists!");
    } else {
      this.data[this.hashMod(key)] = new KeyValuePair(key, value);
      this.count++;
    }
  }

  insertWithHashCollisions(key, value) {
    const index = this.hashMod(key);
    const kvp = new KeyValuePair(key, value);

    if (this.data[index]) {
      kvp.next = this.data[index];
    }
    this.data[index] = kvp;
    this.count++;
  }

  insert(key, value) {
    // Your code here
  }
}

module.exports = HashTable;
