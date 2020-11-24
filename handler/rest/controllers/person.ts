import { ConfigProvider } from "../../../config/provider";
import { Manager } from "../../../core/manager";
import { Person } from "../../../core/person";
import { getOperator, Search } from "../../../core/utility";
import { RestRequest, RestResponse } from "../types";
import fileType from 'file-type'
export const params = {
  id: 'id',
  page: 'page',
  size: 'size',
  created: 'created',
  name: 'name',
  image: 'image'
}

function getId(req: RestRequest): string {
  return req.params[params.id]
}

function getPage(req: RestRequest): number | undefined {
  return req.query[params.page] ? parseInt(req.query[params.page] as string) : undefined
}

function getSize(req: RestRequest): number | undefined {
  return req.query[params.size] ? parseInt(req.query[params.size] as string) : undefined
}
function getCreated(req: RestRequest): string {
  return req.query[params.created] as string
}
function getName(req: RestRequest): string {
  return req.query[params.name] as string
}
function getImage(req: RestRequest): Buffer {
  return req.files[params.image].data
}
function getPerson(req: RestRequest): Person {
  return {
    name: req.body.name,
    bod: req.body.bod
  }
}

export const PersonController = function(m: Manager, c: ConfigProvider) {
  return {
    async insert(req: RestRequest, res: RestResponse){
      const p = getPerson(req)
      await m.storageManager().createPerson(p)
      res.status(201).send({
        message: 'success insert'
      })
    },
    async update(req: RestRequest, res: RestResponse){
      const id = getId(req)
      const p = getPerson(req)
      await m.storageManager().updatePerson(id, p)
      res.status(202).send({
        message: 'success update'
      })
    },
    async delete(req: RestRequest, res: RestResponse){
      const id = getId(req)
      await m.storageManager().deletePerson(id)
        res.status(202).send({
        message: 'success delete'
      })
    },
    async get(req: RestRequest, res: RestResponse){
      const id = getId(req)
      const person = await m.storageManager().getPerson(id)
      res.status(200).send(person)
    },
    async fetch(req: RestRequest, res: RestResponse){
      let search = []
      let created = getCreated(req)
      let name = getName(req)
      if(name) search.push({
        key: 'name',
        operator: '=',
        value: name
      })
      if(created) {
        let [opCreated, valueCreated] = getOperator(created)
          search.push({
          key: 'created',
          operator: opCreated,
          value: valueCreated
        })
      }
      const persons = await m.storageManager().fetchPerson(
        {
          pagination: {
            page: getPage(req),
            size: getSize(req)
          },
          searching: search
        }
      )
      res.status(200).send(persons)
    },
    async uploadImage(req: RestRequest, res:RestResponse){
      const image = getImage(req)
      await m.storageManager().saveImage(getId(req), image)
      res.send({
        message: 'upload success'
      })
    },
    async getImage(req: RestRequest, res:RestResponse){
      const image = await m.storageManager().getImage(getId(req))
      const type = await fileType.fromBuffer(image)
      res.contentType(type.mime)
      res.send(image)
    },
    
  }
}