import { Tracer } from "opentracing";
import { BaseLogger } from "pino";
import { ConfigProvider } from "../config/provider";
import CoreManager from "../core/core.manager";
import { StorageManager, Manager } from "../core/manager";
import { HandlerProvider } from "../handler/provider";
import { StorageProvider } from "../storage/provider";
import { StorageSQLProvider } from "../storage/sql/provider";
import { Registry } from "./registry";
import { RegistryBase } from "./registry.base";


export class RegistrySQLs extends RegistryBase implements Registry {
  l: BaseLogger
  c: ConfigProvider
  t: Tracer = new Tracer
  db: StorageManager
  constructor(c: ConfigProvider) {
    super()
    this.c = c
    this.l = c.logger()
    this.db = new StorageSQLProvider(c)
    this.set(this).setConfig(c).setManager(new CoreManager(this.db, c))
  }
  withConfig(c: ConfigProvider): Registry {
    this.c = c
    return this
  }
  withLogger(l: BaseLogger): Registry {
    this.l = l
    return this
  }
  handler(): HandlerProvider {
    return super.handler()
  }
  tracer(): Tracer {
    return this.t
  }
  withManager(m: Manager): Registry{
    this.m = m
    return this
  }
  init() {
    return
  }
  manager(): Manager {
    return this.m
  }
  provider(): StorageProvider{
    return this.db
  }
  configuration(): ConfigProvider {
    return this.c
  }

}