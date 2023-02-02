import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import useRoutes from '../router'
import errorHandler from './error-handle'
import cors from 'koa2-cors'
import type { ParameterizedContext } from 'koa'

const app = new Koa()

app.use(
  cors({
    origin: function (ctx: ParameterizedContext) {
      //设置允许来自指定域名请求
      const whiteList = [
        'http://192.168.168.75:8080',
        'http://rxdata.zjrxhky.com',
        'http://192.168.162.151:80',
        'http://192.168.162.151'
      ] //可跨域白名单
      let url = ctx.header.origin ?? 'http://localhost:80'
      if (whiteList.includes(url)) {
        return url // 注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
      }
      return 'http://localhost:80' //默认允许本地请求80端口可跨域
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
)

app.use(bodyParser())
useRoutes(app)
app.on('error', errorHandler)

export default app
