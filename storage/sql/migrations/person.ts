import { tables } from "../connection"
import * as Knex from 'knex'

export const up = (knex: Knex, promise: Promise<any>) => {
  return knex.schema.createTable(tables.person, (table: Knex.CreateTableBuilder) => {
    table.bigIncrements('inc_id').primary()
    table.string('id').notNullable().unique()
    table.string('name', 100).notNullable()
    table.date('bod').notNullable()
    table.dateTime('created').notNullable().defaultTo(knex.fn.now())
    table.dateTime('updated').notNullable().defaultTo(knex.fn.now())
  })
}


export const down = (knex: Knex, promise: Promise<any>) => {
  return knex.schema.dropTable(tables.person);
}