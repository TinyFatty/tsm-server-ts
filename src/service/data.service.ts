import type { OkPacket, RowDataPacket } from 'mysql2'
import { conn_data } from '../app/database'
import { IQueryCount, IQueryData } from './types'

class dataService {
  async getDataByQuery(name: String = '', offset = '0', size = '10') {
    const CountStatment = `select count(item.name) as totalcount from nameinfo as item right join (select itemString,MAX(lastScan) as updatetime from dbscan GROUP BY itemString) as db on db.itemString=item.id where item.name like CONCAT('%',?,'%')`
    const totalcountresult = await conn_data.execute(CountStatment, [`${name}`])
    const totalcount = (<IQueryCount[]>totalcountresult[0])[0].totalcount
    const Statement = `select item.name,db.minBuyout,db.marketValue,db.numAuctions,db.quantity,db.updatetime from nameinfo as item right join (select itemString,marketValue,minBuyout,quantity,numAuctions,MAX(lastScan) as updatetime from dbscan GROUP BY itemString) as db on db.itemString=item.id where item.name like CONCAT('%',?,'%') limit ?,? ;`
    const result = await conn_data.execute(Statement, [
      `${name}`,
      offset.toString(),
      size.toString(),
    ])
    const dataResult: IQueryData = {
      status: 200,
      data: { totalCount: totalcount, list: (<RowDataPacket[][]>result)[0] },
      statusText: 'success',
    }
    return dataResult
  }
  async getTimeLineByQuery(name: String = '') {
    const Statement = `select item.name,db.minBuyout,db.marketValue,db.numAuctions,db.quantity,db.lastScan from dbscan as db RIGHT JOIN nameinfo as item on db.itemString=item.id where item.name=? ORDER BY db.lastScan desc limit 0,20`
    const result = await conn_data.execute(Statement, [`${name}`])
    const dataResult: IQueryData = {
      status: 200,
      data: { list: (<RowDataPacket[][]>result)[0] },
      statusText: 'success',
    }
    return dataResult
  }
}
export default new dataService()
