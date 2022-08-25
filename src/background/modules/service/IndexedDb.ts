import { IDBPDatabase, openDB } from "idb";

class IndexedDb {
  private database: string;
  private db: IDBPDatabase<unknown> | undefined;

  constructor(database: string) {
    this.database = database;
    this.db = undefined;
  }

  public async createObjectStore(
    tableAndPrimaryKeyNames: {
      tableName: string;
      keyPath?: string;
      indices?: string[];
      autoIncrement?: boolean;
    }[]
  ) {
    try {
      this.db = await openDB(this.database, 2, {
        upgrade(db: IDBPDatabase) {
          for (const entry of tableAndPrimaryKeyNames) {
            if (db.objectStoreNames.contains(entry.tableName)) {
              continue;
            }
            const store = db.createObjectStore(entry.tableName, {
              keyPath: entry.keyPath,
              autoIncrement: entry.autoIncrement,
            });

            if (entry.indices?.length) {
              entry.indices.forEach((index) => {
                store.createIndex(index, index);
              });
            }
          }
        },
      });
    } catch (error) {
      return undefined;
    }
  }

  public async getValue(tableName: string, key: number | string) {
    if (!this.db || !this.db.objectStoreNames?.contains(tableName)) {
      return undefined;
    }
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = await store.get(key);
    return result;
  }

  public async getValueFromIndex(
    tableName: string,
    indexName: string,
    key: number | string
  ) {
    if (!this.db || !this.db.objectStoreNames?.contains(tableName)) {
      return undefined;
    }
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName).index(indexName);
    const result = await store.get(key);
    return result;
  }

  public async getPaginatedValues(
    tableName: string,
    indexName: string,
    start: number,
    count: number,
    reverse?: boolean
  ) {
    if (!this.db || !this.db.objectStoreNames?.contains(tableName)) {
      return [];
    }
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const index = store.index(indexName);

    let cursor = await (reverse
      ? index.openCursor(null, "prev")
      : index.openCursor());
    if (cursor && start) {
      cursor = await cursor.advance(start);
    }

    const result: any[] = [];
    for (let i = 0; i < count && !!cursor; i++) {
      result.push(cursor.value);
      cursor = await cursor.continue();
    }
    return result;
  }

  public async getAllValue(tableName: string): Promise<any[]> {
    if (!this.db || !this.db.objectStoreNames?.contains(tableName)) {
      return [];
    }
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    return await store.getAll();
  }

  public async putValue(tableName: string, value: object) {
    if (!this.db || !this.db.objectStoreNames?.contains(tableName)) {
      return;
    }
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    await store.put(value);
    return;
  }

  public async putBulkValue(tableName: string, values: object[]) {
    if (!this.db || !this.db.objectStoreNames?.contains(tableName)) {
      return undefined;
    }
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    for (const value of values) {
      await store.put(value);
    }
    return this.getAllValue(tableName);
  }

  public async deleteValue(tableName: string, id: number | string) {
    if (!this.db || !this.db.objectStoreNames?.contains(tableName)) {
      return;
    }
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    await store.delete(id);
    return;
  }
}

export default IndexedDb;
