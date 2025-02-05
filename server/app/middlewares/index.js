export default async function catchError (ctx, next) {
  try {
    await next()
    if (ctx.status === 404) ctx.throw(404)
  } catch (err) {
    const status = err.status || 500
    ctx.status = status
    ctx.state = {
      status: status,
      helpers: null,
      currentUser: null
    }
    await ctx.render('error/error', {})
    if (status === 500) {
      console.log('server error', err, ctx)
    }
  }
}
