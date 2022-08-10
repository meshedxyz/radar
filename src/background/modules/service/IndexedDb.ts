import { IDBPDatabase, openDB } from "idb";

class IndexedDb {
  private database: string;
  private db: any;

  constructor(database: string) {
    this.database = database;
  }

  public async createObjectStore(
    tableAndPrimaryKeyNames: { tableName: string; keyPath: string }[]
  ) {
    try {
      this.db = await openDB(this.database, 1, {
        upgrade(db: IDBPDatabase) {
          for (const entry of tableAndPrimaryKeyNames) {
            if (db.objectStoreNames.contains(entry.tableName)) {
              continue;
            }
            db.createObjectStore(entry.tableName, {
              keyPath: entry.keyPath,
            });
          }
        },
      });
    } catch (error) {
      return false;
    }
  }

  public async getValue(tableName: string, key: number | string) {
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = await store.get(key);
    return result;
  }

  public async getAllValue(tableName: string): Promise<any[]> {
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = await store.getAll();
    return result;
  }

  public async putValue(tableName: string, value: object) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result = await store.put(value);
    return result;
  }

  public async putBulkValue(tableName: string, values: object[]) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    for (const value of values) {
      const result = await store.put(value);
    }
    return this.getAllValue(tableName);
  }

  public async deleteValue(tableName: string, id: number) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    if (!result) {
      return result;
    }
    await store.delete(id);
    return id;
  }
}

export default IndexedDb;
