import IO from 'koa-socket'
import co from 'co'
import app from './app'
const io = new IO()
const chat = new IO('chat')

io.attach( app )
chat.attach( app )

// io.on( 'join', ( ctx, data ) => {
//   console.log( 'join event fired', data )
// })

io.use( async ( ctx, next ) => {
  let start = new Date()
  await next()
  console.log( `response time: ${ new Date() - start }ms` )
})

io.use( co.wrap( function *( ctx, next ) {
  ctx.teststring = 'test'
  yield next()
}))

/**
 * Socket handlers
 */
io.on( 'connection', ctx => {
  console.log( 'Join event', ctx.socket.id )
  io.broadcast( 'connections', {
    numConnections: io.connections.size
  })
  // app.io.broadcast( 'connections', {
  //   numConnections: socket.connections.size
  // })
})

io.on( 'disconnect', ctx => {
  console.log( 'leave event', ctx.socket.id )
  io.broadcast( 'connections', {
    numConnections: io.connections.size
  })
})
io.on( 'data', ( ctx, data ) => {
  console.log( 'data event', data )
  console.log( 'ctx:', ctx.event, ctx.data, ctx.socket.id )
  console.log( 'ctx.teststring:', ctx.teststring )
  ctx.socket.emit( 'response', {
    message: 'response from server'
  })
})
io.on( 'ack', ( ctx, data ) => {
  console.log( 'data event with acknowledgement', data )
  ctx.acknowledge( 'received' )
})
io.on( 'numConnections', packet => {
  console.log( `Number of connections: ${ io.connections.size }` )
})

/**
 * Chat handlers
 */
chat.on( 'connection', ctx => {
  console.log( 'Joining chat namespace', ctx.socket.id )
})
chat.on( 'message', ctx => {
  const message = ctx.data
  console.log( 'chat message received', message )

  // Broadcasts to everybody, including this connection
  // app.chat.broadcast( 'message', `this connection text: ${message}` )
  app.chat.broadcast( 'message', message )

  // Broadcasts to all other connections
  // ctx.socket.broadcast( 'message', `all other connections text: ${message}` )

  // Emits to just this socket
  // ctx.socket.emit( 'message', `this socket connection text: ${message}` )
})
