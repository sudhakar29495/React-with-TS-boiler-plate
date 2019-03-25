export interface IStorageObject {
  key: string,
  value: any
}

interface IStorageService {
  setItem : (key: string, value: any) => void ,
  setItems : (storageObjects: IStorageObject[]) => void
}

/**
 * Util Class to handle storage services
 * Localstorage, SessionStorage can be handled
 */
class StorageService implements IStorageService {
  public setItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }
  public setObject(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  public getObject(key: string): object {
    return JSON.parse(this.getItem(key));
  }

  public setItems(storageObjects: IStorageObject[]) : void {
    storageObjects.forEach((storageObject: IStorageObject) => {
      this.setItem(storageObject.key, storageObject.value);
    });
  }
  public getItem(key: string) : any { return localStorage.getItem(key); }
  public deleteItem(key: string) : void { localStorage.removeItem(key); }
}

export default new StorageService();
