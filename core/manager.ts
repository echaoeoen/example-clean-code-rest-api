import { ParamPerson, Person } from "./person";
import { PaginatedData } from "./utility";

export interface StorageManager {
  createPerson(p: Person): Promise<void>
  updatePerson(id: string, p: Person): Promise<void>
  deletePerson(id: string): Promise<void>
  fetchPerson(param?: ParamPerson): Promise<PaginatedData<Person[]>>
  getPerson(id: string): Promise<Person>
  saveImage(id: string, image: Buffer): Promise<void>
  getImage(id: string): Promise<Buffer>
}

export interface Manager {
  storageManager(): StorageManager
}