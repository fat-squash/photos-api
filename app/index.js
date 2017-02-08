import Koa from 'koa'
import session from 'koa-generic-session'
import csrf from 'koa-csrf'
import views from 'koa-views'
import convert from 'koa-convert'
import json from 'koa-json'
import multer from 'koa-multer'
import path from 'path'
import serve from 'koa-static'

import bodyParser from 'koa-bodyparser'
import koaBody from 'koa-body'

import logger from 'koa-logger'
import router from './router'
import pug from 'js-koa-pug'
import methodOverride from 'koa-methodoverride'
import passport from 'koa-passport'

const app = new Koa()

app.use( convert(
  bodyParser({
    extendTypes: { json: ['application/x-javascript'] },
    detectJSON: ctx => /\.json$/i.test(ctx.path)
  })
) )
app.use( pug('./app/views') )
app.use( router.routes() )
app.use( router.allowedMethods() )
app.use( convert( json() ) )
app.use( convert( logger() ) )
app.use( convert( serve('public') ) )

const uploadDir = path.join(__dirname, '../uploads')

app.use(koaBody({
  multipart: true,
  formidable: { uploadDir }
}))



// app.keys = ['secret']
// app.use( async (ctx, next) => session(app) )
// app.use( async (ctx, next) => passport.initialize() )
// app.use( async (ctx, next) => passport.session() )
// app.use( async (ctx, next) => {
//   try {
//     await next()
//   } catch (err) {
//     ctx.body = { message: err.message }
//     ctx.status = err.status || 500
//   }
// })

app.listen(4000)
