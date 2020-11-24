import { ConfigProvider } from "./provider";
import config from 'config';
import pino, { BaseLogger } from "pino";

export class Config implements ConfigProvider {
  l: BaseLogger

  constructor(){
    this.l = pino({
      name: 'rest-api',
      timestamp: true
    })
  }
  listenPort(): number {
    return config.get<number>('listen.port')
  }
  listenHost(): string {
    return config.get('listen.host')
  }
  
  dsn(): string {
    return config.get('dsn');
  }
  
  logger(): BaseLogger {
    return this.l
  }
  handler(): string {
    return 'rest'
  }
}
