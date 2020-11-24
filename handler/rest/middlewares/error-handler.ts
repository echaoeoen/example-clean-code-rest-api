import { NextFunction } from "express";
import { ConfigProvider } from "../../../config/provider";
import { RestError } from "../../../error/error";
import { RestRequest, RestResponse } from "../types";

export default (c: ConfigProvider) => 
  ( 
    err: RestError, 
    req: RestRequest, 
    res: RestResponse, 
    next: NextFunction) => {
  
  if (res.headersSent) return next(err)

  if (!err.code) {
    c.logger().error({
      error: err,
      stacktrace: err.stack
    })
    return res.status(500).json({ message: 'unexpected error' })
  }

  res.status(err.code).json({ message: err.message })
  
}