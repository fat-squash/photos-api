import passport from 'koa-passport'
import session from 'koa-generic-session'
import app from './app'

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
