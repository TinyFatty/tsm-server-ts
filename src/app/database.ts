import mysql from 'mysql2'
import config from './config'

const connection_data = mysql.createPool(
  eval('(' + config.MYSQL_CONFIG_DATA + ')')
)
connection_data.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log('data数据库连接失败')
    } else {
      console.log('data数据库连接成功')
    }
  })
})
const conn_data = connection_data.promise()
export { conn_data }
