import { BaseLogger } from "pino";

export interface ConfigProvider {
  dsn(): string
  logger(): BaseLogger
  listenPort(): number
  listenHost(): string
  handler(): string

}