export default function pages(router) {
  router.get('/', async ctx => await ctx.render('index') )
  router.get('/index', async ctx => await ctx.render('index') )
  router.get('/about', async ctx => await ctx.render('about') )
  router.get('/contacts', async ctx => await ctx.render('contacts') )
  router.get('/login', async ctx => await ctx.render('login') )
}
