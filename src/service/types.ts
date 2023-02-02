import { RowDataPacket } from 'mysql2'

export interface IQueryCount {
  totalcount: number
}
export interface IQueryData<T = RowDataPacket> {
  status: number
  data?: {
    totalCount?: number
    list: Array<T>
  }
  statusText: string
}
