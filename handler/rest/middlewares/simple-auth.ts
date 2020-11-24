import { NextFunction } from "express"
import { RestRequest, RestResponse } from "../types"

import { Base64 } from 'js-base64'

export interface SimpleAuthConfig {

}

const middlwareSimpleAuth = (config: SimpleAuthConfig = {}) => {
  return (req: RestRequest, res: RestResponse, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(401).send({message: 'auth required'}).setHeader('WWW-Authenticate', `Basic realm="${req.host}"`)
    const authType = authHeader.split(' ')[0]

    if(authType.toLowerCase() !== 'basic' ) return res.status(401).send({
      message: 'unauthorized'
    })

    const authValue = authHeader.split(' ')[1]
    if(!authValue) return res.status(401).send({
      message: 'unauthorized'
    })

    const parsed = Base64.decode(authValue)
    const v = parsed.split(':')
    
    if(v[0] === 'admin' && v[0] ==='admin') return next()
    
    res.status(401).send({
      message: 'unauthorized'
    })
  }
}

export default middlwareSimpleAuth