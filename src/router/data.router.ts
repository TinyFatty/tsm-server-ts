import Router from 'koa-router'
import { getDataTable, getDataTimeline } from '../controller/data.controller'

const router = new Router({ prefix: '/data' })
router.get('/datatable', getDataTable)
router.post('/timeline', getDataTimeline)
export default router
