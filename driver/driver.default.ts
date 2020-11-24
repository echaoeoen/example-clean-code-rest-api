import { Config } from "../config/config"
import { ConfigProvider } from "../config/provider"
import { Driver } from "./driver"
import { callRegistry, Registry } from "./registry"
import { RegistrySQLs } from "./registry.sqls"

export default class DefaultDriver implements Driver{
  private c: Config
  private r: Registry
  constructor() {
    this.c = new Config()
    if (this.c.dsn() === '') {
      throw new Error('no dsn')
    }
    this.r = new RegistrySQLs(this.c)
    this.r
      .withConfig(this.c)
      .withLogger(this.c.logger())
  }
  configuration(): ConfigProvider {
    return this.c
  }
  registry(): Registry {
    return this.r
  }
  callRegistry(): Driver {
    callRegistry(this.registry())
    return this
  }
}