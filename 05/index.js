/*
 * @Descripttion: 
 * @version: 
 * @Author: rkz
 * @Date: 2021-02-17 10:20:18
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-17 10:53:19
 */
const Koa = require('koa');
const app = new Koa();
// console.log('8888----------',app);
const mid1 = async (ctx, next) => {
    ctx.body = 'hellow'
    await next()
    ctx.body = ctx.body + ' !!!'
}
const mid2 = async (ctx, next) => {
    ctx.type = 'text/html;charset=utf-8'
    await next()
}
const mid3 = async (ctx, next) => {
    ctx.body = ctx.body + ' kaikeba';
    await next()
}
app.use(mid1);
app.use(mid2);
app.use(mid3);

app.listen(3000);