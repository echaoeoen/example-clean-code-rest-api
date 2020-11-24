import { ConfigProvider } from '../config/provider'
import { Registry } from './registry'
export interface Driver {
  configuration(): ConfigProvider
  registry(): Registry
  callRegistry(): Driver
}