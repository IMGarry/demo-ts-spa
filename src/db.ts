export default class IndexedDB {
    public db!: IDBDatabase;
    dbName:string = 'users'   
    dbVersion:number = 1
    // openDB(): Promise<IDBDatabase> {
    //     return new Promise((resolve) => {
    //       const iDB = window.indexedDB;
    //       const openReq = iDB.open('@sergioserg835', 1);
    
    //       openReq.onupgradeneeded = () => {
    //         const database = openReq.result;
    
    //         if (!database.objectStoreNames.contains('tableResults')) {
    //           const tableResults = database.createObjectStore('tableResults', {autoIncrement: true});
    //         }
    //         this.db = database;
    //       }
    
    //       openReq.onsuccess = () => {
    //         this.db = openReq.result;
    //         resolve(this.db);
    //       };
    
    //       openReq.onerror = () => {
    //           console.log('error opening databese ' + openReq.error);
    //       };
    //     });
    //   }

    openDB() {
      if (!window.indexedDB) {
        throw new Error ('Unsupported indexedDB');
      }

      let request = window.indexedDB.open(this.dbName, this.dbVersion);
  
      request.onsuccess = e => {
        this.db = request.result;
      };
      request.onerror = e => callback(e.target.error);
      request.onupgradeneeded = e => {
        this.db = e.target.result;
        this.db.onabort = e2 => callback(e2.target.error);
        this.db.error = e2 => callback(e2.target.error);
        this.db.oncomplete = e2 => {
          stores.forEach((o) => {
            this.db.createObjectStore(o.name, o.option);
          });
        }
      };
    }
  
    deleteDB() {
      if (window.indexedDB) {
        window.indexedDB.deleteDatabase(this.dbName);
      }
    }
  
    deleteStore(storeName, callback=(()=>{})) {
      if (this.db) {
        this.db.deleteObjectStore();
        this.db.oncomplete = e => callback(e.target.result);
        this.db.onabort = e => callback(e.target.error);
        this.db.error = e => callback(e.target.error);
      }
    }
  
    upsert(storeName, data, callback=(()=>{})) {
      if (this.db && data) {
        let transaction = this.db.transaction([storeName], IDBTransaction.READ_WRITE);
        transaction.onabort = te => callback(te.target.error);
        transaction.onerror = te => callback(te.target.error);
  
        let request = transaction.objectStore(storeName).put(data);
        request.onerror = e => callback(e.target.error);
        request.onsuccess = e => callback(e.target.result);
      }
    }
  
    get(storeName, key, callback=(()=>{})) {
      if (this.db && key) {
        let request = this.db.transaction([storeName]).objectStore().get(key)
        request.onerror = e => callback(e.target.error);
        request.onsuccess = e => callback(e.target.result);
      }
    }
  
    getAll(storeName, callback=(()=>{})) {
      if (this.db) {
        let request = this.db.transaction(storeName).objectStore(storeName).openCursor(null, IDBCursor.NEXT);
        let results = [];
        request.onsuccess = e => {
          let cursor = e.target.result;
          if (cursor) {
            console.log("Key:" + cursor.key + " Value:" + cursor.value);
            results.push({ [cursor.key]: cursor.value });
            cursor.continue();
          } else {
            callback(results);
          }
        };
        request.onerror = e => callback(e.target.error);
      }
    }
  
    remove(storeName, key, callback=(()=>{})) {
      if (this.db) {
        let request = this.db.transaction([storeName], IDBTransaction.READ_WRITE).objectStore(storeName).delete(key);
        request.onerror = e => callback(e.target.error);
        request.onsuccess = e => callback(e.target.result);
      }
    }
  
    clear(storeName, callback=(()=>{})) {
      if (this.db) {
        let request = this.db.transaction([storeName], IDBTransaction.READ_WRITE).objectStore(storeName).clear();
        request.onerror = e => callback(e.target.error);
        request.onsuccess = e => callback(e.target.result);
      }
    }
  
    count(storeName, callback=(()=>{})) {
      if (this.db) {
        let request = this.db.transaction([storeName]).objectStore(storeName).count();
        request.onerror = e => callback(e.target.error);
        request.onsuccess = e => callback(e.target.result);
      }
    }
  }