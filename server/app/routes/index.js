import Router from 'koa-router'
import banner from './banner.js'

const router = Router()

// routes表示的是路由的嵌套处理
router.use(banner.routes(), banner.allowedMethods())

export default router