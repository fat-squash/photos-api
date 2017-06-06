import passport from 'koa-passport'
import authStrategy from './authStrategy'
export default function auth(router) {
  // router.get('/login', async ctx => await ctx.render('login') )


  router.post('/custom', function(ctx, next) {
    return passport.authenticate('local', function(err, user, info, status) {
      if (user === false) {
        ctx.body = { success: false }
        ctx.throw(401)
      } else {
        ctx.body = { success: true }
        return ctx.login(user)
      }
    })(ctx, next)
  })

  // POST /login
  router.post('/login',
    passport.authenticate('local', {
      successRedirect: '/app',
      failureRedirect: '/'
    })
  )

  router.get('/logout', function(ctx) {
    ctx.logout()
    ctx.redirect('/')
  })

  router.get('/auth/facebook',
    passport.authenticate('facebook')
  )

  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/app',
      failureRedirect: '/'
    })
  )

  router.get('/auth/twitter',
    passport.authenticate('twitter')
  )

  router.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect: '/app',
      failureRedirect: '/'
    })
  )

  router.get('/auth/google',
    passport.authenticate('google')
  )

  router.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/app',
      failureRedirect: '/'
    })
  )

  router.get('/app', ctx => ctx.render('index') )


}
