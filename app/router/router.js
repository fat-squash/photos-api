import Router from 'koa-router'
const router = new Router()
import user from './user'
import pages from './pages'
import auth from './auth'

user(router)
pages(router)
auth(router)

export default router
