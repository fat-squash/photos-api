import Router from 'koa-router'
import asyncBusboy from 'async-busboy'

import {createUser, findUserById, showUsers} from './../db/user'
const router = new Router()

router.get('/', async ctx => await ctx.render('index') )
router.get('/about', async ctx => await ctx.render('about') )
router.get('/contacts', async ctx => await ctx.render('contacts') )

router.get('/users', async (ctx) => {
  return showUsers()
  .then( data => {
    ctx.body = JSON.stringify(data)
  } )
} )

router.post('/user', async (ctx) => {
  const {files, fields} = await asyncBusboy(ctx.req)
  const {name, date} = fields

  // showUsers()
  // .then( data => {
  //   ctx.body = JSON.stringify(data)
  // } )

  createUser(name, date, files)

  ctx.body = JSON.stringify({
    files, fields
  })
} )

router.get('/user/:id', (ctx) => {
  const {id} = ctx.params
  return id && findUserById(id)
    .then( user => {
      ctx.body = JSON.stringify(user.dataValues)
    } )
} )

router.get('/route/:name', (ctx) => {
  const {query, params} = ctx
  console.log(params.name)
  console.log(query.name)
})

router.get('/hello', ctx => {
  const data = {
    hello: 'Hello!',
    num: 1,
    arr: [1,2,3,4,5],
    obj: {a1: 1, a2: 2, a3: 3},
    data: new Date()
  }

  ctx.body = JSON.stringify(data)
})

export default router
