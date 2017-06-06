import Koa from 'koa'
import session from 'koa-generic-session'
import csrf from 'koa-csrf'
import views from 'koa-views'
import convert from 'koa-convert'
import json from 'koa-json'
import multer from 'koa-multer'
import path from 'path'
import serve from 'koa-static'
import koaBody from 'koa-body'
import logger from 'koa-logger'
import router from './router'
import pug from 'js-koa-pug'
import methodOverride from 'koa-methodoverride'
import passport from 'koa-passport'

const app = new Koa()
app.proxy = true
app.use( pug('./app/views') )
app.use( router.routes() )
app.use( router.allowedMethods() )
app.use( convert( json() ) )
app.use( convert( logger() ) )
app.use( convert( serve('public') ) )

const uploadDir = path.join(__dirname, '..', '/public' + '/uploads')
app.use( koaBody( { multipart: true, formidable: { uploadDir } } ) )

app.keys = ['___secret___sl34l342l23l540sgds0hh']
app.use( ctx => session(app) )
app.use( ctx => passport.initialize() )
app.use( ctx => passport.session() )

app.use(function(ctx, next) {
  if (ctx.isAuthenticated()) {
    return next()
  } else {
    ctx.redirect('/')
  }
})

app.listen(4000)
