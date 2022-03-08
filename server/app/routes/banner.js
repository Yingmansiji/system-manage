import Router from 'koa-router'
import axios from 'axios'
import {banner, menu} from './urlConfig.js'

const router = Router();

router.post(`/login`, async (ctx, next) => {
    const body = ctx.request.body;
    const response = await axios
        .post(banner, body, {
            headers: {
                "Content-Type": "application/json",
            }
        });
    ctx.body = response.data
});

router.post(`/menu`, async (ctx, next) => {
    const body = ctx.request.body;
    const header = ctx.request.header;
    const response = await axios
        .post(menu, body, {
            headers: {
                "Content-Type": "application/json",
                token: header.token
            }
        });
    ctx.body = response.data
});

export default router
