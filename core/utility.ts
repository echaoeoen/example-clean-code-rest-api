
export interface Search {
  key: string
  operator: '=' | '<' | '>' | '>=' | '<='
  value: string
}

export interface Pagination {
  page?: number
  size?: number
  total_page?: number
}

export interface PaginatedData<T> {
  pagination: Pagination
  data: T
}

export const getOperator = (value: string): [string, string] => {
  const op = ['=' , '<' , '>' , '>=' , '<=']
  for (const i in op) {
    const element = op[i];
    if(value.length > element.length){
      if(value.substr(0, element.length) === element) {
        return [value.substr(0, element.length), value.substr(element.length - 1, value.length)]
      }
    }
  }
  return ['=', value]
}