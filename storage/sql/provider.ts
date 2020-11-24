import Knex from "knex";
import { ParamPerson, Person } from "../../core/person";
import { StorageProvider } from "../provider";
import { ConfigProvider } from '../../config/provider'
import { connection, tables } from "./connection";
import * as uuid from 'uuid'
import { InternalServerError, NotFoundError } from "../../error/error";
import { PaginatedData } from "../../core/utility";

const DEFAULT_SIZE = 10

export class StorageSQLProvider implements StorageProvider{
  dbClient: Knex
  c: ConfigProvider
  constructor(c: ConfigProvider){
    this.dbClient = connection(c)
    this.c = c
  }
  async migrate(...param: string[]){
    try {
      if (param[0] === 'rollback') { await this.dbClient.migrate.rollback() } else await this.dbClient.migrate.latest()
      this.dbClient.destroy()
    } catch (err) {
      this.c.logger().error({
        err
      })
    }
  }
  async createPerson(p: Person): Promise<void> {
    p.id = uuid.v4()
    await this.dbClient(tables.person).insert(p)
  }
  async updatePerson(id: string, p: Person): Promise<void> {
    await this.dbClient(tables.person).where({ id }).update(p)
  }
  async deletePerson(id: string): Promise<void> {
    await this.dbClient(tables.person).delete().where({ id })
  }
  async fetchPerson(param: ParamPerson = {
    pagination: {},
    searching: []
  }): Promise<PaginatedData<Person[]>> {
    param.pagination.page = param.pagination.page || 1
    param.pagination.size = param.pagination.size || DEFAULT_SIZE
    try {
      const {
        page, size
      } = param.pagination
      let func = this.dbClient<Person>(tables.person).select('name', 'bod', 'id', 'created', 'updated')
      let funcCount = this.dbClient<Person>(tables.person)
      for (const i in param.searching) {
        if (Object.prototype.hasOwnProperty.call(param.searching, i)) {
          let {
            key, operator, value
          } = param.searching[i];
          let op = null
          if(operator === '=') {
            op = 'like'
            value = `%${value}%`
          }
          func.where(key, op, value)
          funcCount.where(key, op, value)
        }
      }
      let t = await funcCount.count<Record<string, number>>('name')
      let p = await func.limit(size).offset((page - 1) * size)
      return {
        data: p,
        pagination: {
          page, size, total_page: t[0]['count(`name`)']
        }
      }
    } catch (err) {
      this.c.logger().error({error: err, stacktrace: err.stack}, "error connect to db")
      throw new InternalServerError("Error while connecting to DB")
    }
  }
  async getPerson(id: string): Promise<Person> {
    let p = await this.dbClient<Person>(tables.person).select('name', 'bod', 'id', 'created', 'updated').where({ id })
    if(p.length === 0) throw new NotFoundError('Person not found')
    return p[0]
  }
  async saveImage(id: string, image: Buffer): Promise<void> {
    await this.dbClient(tables.person).update({
      image
    }).where({ id })

  }
  async getImage(id: string): Promise<Buffer>{
    let p = await this.dbClient<Person>(tables.person).select('image').where({ id })
    if(p.length === 0) throw new NotFoundError('Person not found')
    return p[0].image
  }
}