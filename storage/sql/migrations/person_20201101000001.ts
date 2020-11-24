import { tables } from "../connection"
import * as Knex from 'knex'

export const up = (knex: Knex, promise: Promise<any>) => {
  return knex.schema.alterTable(tables.person, (table: Knex.CreateTableBuilder) => {
    table.specificType('image', 'blob')
  })
}


export const down = (knex: Knex, promise: Promise<any>) => {
  return knex.schema.alterTable(tables.person, (table: Knex.CreateTableBuilder) => {
    table.dropColumn('image')
  })
}