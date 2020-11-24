import { NextFunction } from "express"
import { BaseLogger } from "pino"
import { RestRequest, RestResponse } from "../types"

export interface MiddlewareLoggerConfig {
  logType?: 'body' | 'path' | 'full'
}

const middlewareLogger = (logger: BaseLogger, config: MiddlewareLoggerConfig = {}) => {
  return (req: RestRequest, res: RestResponse, next: NextFunction) => {
    if(config.logType === 'path') logger.info({
      path: req.path
    })
    else if(config.logType === 'full') logger.info({
      path: req.path,
      body: req.body
    })
    else if(config.logType === 'body') logger.info({
      body: req.body
    })
    next()
  }
}

export default middlewareLogger