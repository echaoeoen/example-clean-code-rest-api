import { ConfigProvider } from "../config/provider"
import { Manager, StorageManager } from "./manager"

export default class CoreManager implements Manager{
  private c: ConfigProvider
  private st: StorageManager
  constructor(st: StorageManager, c: ConfigProvider) {
    this.c = c
    this.st = st
  }

  storageManager(): StorageManager {
    return this.st
  }
}