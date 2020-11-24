import knex from 'knex'
import { ConfigProvider } from '../../config/provider'
const path = require('path')

export const tables = {
  person: 'person',
}
export const connection = (c: ConfigProvider) => {
  let client = c.dsn().split('://')[0]
  let connection = c.dsn()
  return knex({
    client,
    connection,
    pool: { min: 0, max: 7 },
    migrations: {
      directory: path.join(__dirname, './migrations')
    }
  })
}