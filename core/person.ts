import { Search, Pagination } from "./utility";

export interface Person {
  id?: string
  name: string
  bod: string
  image?: Buffer
  created?: Date
  updated?: Date
}

export interface ParamPerson {
  pagination?: Pagination
  searching?: Search[]
}
