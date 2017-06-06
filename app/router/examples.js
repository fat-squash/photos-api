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
