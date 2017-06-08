// import csrf from 'koa-csrf'
import path from 'path'
import convert from 'koa-convert'

import views from 'koa-views'
import pug from 'js-koa-pug'

import json from 'koa-json'
import logger from 'koa-logger'
import serve from 'koa-static'
import koaBody from 'koa-body'

// app modules 👇
import app from './app'
import router from './router'
// import auth from './auth'
import socket from './socket'

app.proxy = true
app.use( pug('./app/views') )
app.use( router.routes() )
app.use( router.allowedMethods() )
app.use( convert( json() ) )
app.use( convert( logger() ) )
app.use( convert( serve('public') ) )
app.use( koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '..', '/public' + '/uploads')
    }
  })
)
app.listen(4000)
