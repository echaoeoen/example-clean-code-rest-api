import { ConfigProvider } from "../config/provider";
import { Manager } from "../core/manager";
import { Registry } from "../core/registry";
import { HandlerProvider } from "../handler/provider";
import { RestHandler } from "../handler/rest/restPovider";

export class RegistryBase {
  protected r: Registry = null
  protected c: ConfigProvider = null
  protected h: HandlerProvider = null
  protected m: Manager = null
  set(r: Registry): RegistryBase {
    this.r = r
    return this
  }
  setConfig(c: ConfigProvider): RegistryBase {
    this.c = c
    return this
  }
  setManager(m: Manager): RegistryBase{
    this.m = m
    return this
  }
  protected handler(): HandlerProvider {
    if (this.c.handler() === 'rest') {
      return new RestHandler(this.r.manager(), this.c)
    }
    throw new Error('Handler not impelemented')
  }
}