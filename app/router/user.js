import asyncBusboy from 'async-busboy'
const koaBody = require('koa-body')()
import {createUser, deleteUserById, findUserById, showUsers} from './../db/user'

export default function user(router) {
  router.get('/users', async (ctx) => {
    return await showUsers().then( data => ctx.body = data )
  })

  router.get('/user/:id', (ctx) => {
    const {id} = ctx.params
    return id && findUserById(id)
      .then( user => ctx.body = user.dataValues )
  })

  router.post('/user', async (ctx) => {
    const {files, fields} = await asyncBusboy(ctx.req)
    const {name, date} = fields
    return await createUser(name, date, files)
    .then( newUser => {
      ctx.body = newUser.dataValues
    })
    // return await showUsers().then( data => ctx.body = data )
  })

  router.delete('/user/:id', (ctx) => {
    const {id} = ctx.params
    return id && deleteUserById(id)
      .then( user => ctx.body = user.dataValues )
  })

  router.post('/test', koaBody, async (ctx) => {
    return await showUsers().then( data => ctx.body = data )
  })
}
