import type { ParameterizedContext, Next } from 'koa'
import service from '../service/data.service'

interface IDatatable {
  name: string
  offset?: number
  size?: number
}

class dataController {
  async getDataTable(ctx: ParameterizedContext, next: Next) {
    const { name, offset, size } = ctx.request.query
    const result = await service.getDataByQuery(name as string, offset as string, size as string)
    ctx.body = result
    await next()
  }
  async getDataTimeline(ctx: ParameterizedContext, next: Next) {
    const { name } = <IDatatable>ctx.request.body
    const result = await service.getTimeLineByQuery(name as string)
    ctx.body = result
    await next()
  }
}

export const { getDataTable, getDataTimeline } = new dataController()
