import Router from 'koa-router'
import user from './user'
import pages from './pages'
import auth from './auth'

const router = new Router()

user(router)
pages(router)
// auth(router)

export default router
