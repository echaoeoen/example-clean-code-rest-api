import { ConfigProvider } from "../../config/provider";
import { Manager } from "../../core/manager";
import { HandlerProvider } from "../provider";
import express, { Express } from 'express'
import { Router } from "./router";
import errorHandler from './middlewares/error-handler'
import 'express-async-errors'
export class RestHandler implements HandlerProvider {
  m: Manager
  c: ConfigProvider
  app: Express
  constructor(m: Manager, c: ConfigProvider){
    this.m = m
    this.c = c
    this.app = express()
    this.app.use(Router(m, c))
    this.app.use(errorHandler(c))
  }

  serve(): void {
    this.app.listen(this.c.listenPort(), this.c.listenHost(), () => {
      this.c.logger().info({
        message: `app started at ${this.c.listenHost()}:${this.c.listenPort()}`
      })
    })
  }

  manager(): Manager {
    return this.m
  }
  configuration(): ConfigProvider {
    return this.c
  }

}