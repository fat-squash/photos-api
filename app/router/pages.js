export default function pages(router) {
  router.get('/', async ctx => await ctx.render('index') )
  function addPage(pageName) {
    router.get(`/${pageName}`, async ctx => await ctx.render(pageName) )
  }

  const pagesList = ['index', 'about', 'contacts', 'chat', 'login']
  pagesList.forEach( item => addPage(item) )
}

