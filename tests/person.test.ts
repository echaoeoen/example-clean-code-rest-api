import { expect } from "chai"
import { Config } from "../config/config"
import { Person } from "../core/person"
import { NotFoundError } from "../error/error"
import { StorageSQLProvider } from "../storage/sql/provider"

function plus(a: number, b: number) {
  return a + b
}
describe('person.test', () => {
  const personStorage = new StorageSQLProvider(new Config())
  it('should insert success', async () => {
    // for(let i = 0; i< 100; i++ ){
    //   const person:Person = {
    //     bod: '1995-04-16',
    //     name: 'Echa Oeoen'
    //   }
    //   await personStorage.createPerson(person)
    // }
  })
  it('Pagination', async () => {
    const getPerson = await personStorage.fetchPerson({ pagination:{
      size: 10,
      page: 1
    }})
    expect(getPerson.data.length).eq(11)
  })
})