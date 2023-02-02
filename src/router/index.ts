import fs from 'fs'
import type Koa from 'koa'
import path from 'path'

const useRoutes = (app: Koa) => {
  const routerList = ['data']
  routerList.forEach((file) => {
    if (file === 'index.ts') return
    import(`./${file}.router`).then((Router) => {
      const router = Router.default
      app.use(router.routes())
      app.use(router.allowedMethods())
    })
  })
}

export default useRoutes
