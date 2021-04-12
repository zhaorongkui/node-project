/*
 * @Descripttion: 
 * @version: 
 * @Author: rkz
 * @Date: 2021-03-16 15:16:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-16 19:24:53
 */
const koa = require('koa');// http, 包装过的http
const koaStaticCache = require('koa-static-cache')
const Router = require('koa-router');
const Swig = require('koa-swig');
const co = require('co')

// const render = Swig(options);

const router = new Router();

// 创建一个http服务器，监听请求，类似http.createServer()
const app = new koa();

// app.use((ctx,next)=>{
//     ctx.body = "hello"
//     next()
// })

// app.use((ctx,next) =>{
//     ctx.body += " Koa"
// })

// app.use((ctx, next)=>{
//     // 手动抛出一个错误
//     // throw new Error
//     // ctx.throw(404, '页面没有了', {a: 3})
//     // console.log(ctx.request)
//     // ctx.response.body = {a: 1, b: 2}
//     // ctx.attachment('a.text'); // 下载
// })

app.use(koaStaticCache(__dirname + '/static',{
    prefix: '/public'
}))

app.on('error', err => {
    // console.log('出错了！', err)
})
// app.use((ctx,next)=>{
//     ctx.body = "hello"
//     let n = Math.random();
//     ctx.state.n = n;
//     next()
// })

// app.use((ctx,next) =>{
//     ctx.body += " koa"
//     console.log(ctx.state.n)
// })


// // 路由嵌套
// const userRouter = new Router();
// userRouter.get('/',(ctx,next)=>{
//     ctx.body = '用户首页'
// })
// userRouter.get('/address',(ctx,next)=>{
//     ctx.body = '用户收货地址'
// })
// // userRouter实例挂在到router上
// router.use("/user",userRouter.routes())


// router.get('/',(ctx,next) => {
//     ctx.body = '首页'
// })

// router.get('/user',(ctx,next)=>{
//     ctx.body = "用户页面"
// })
// 带参数的动态路由
// const goodRouter = new Router();
// goodRouter.get('/good/:id',(ctx,next)=>{
    
//     console.log(Router.url('/list',{page: 1},{query: {order: 'desc'}}))
//     ctx.body = "添加商品" + ctx.params.id
// })
// app.use(goodRouter.routes())

const users = [
    {name:'11'},
    {name:'22'},
    {name:'33'},
    {name:'44'},
]
//把路由挂在到app
app.use(router.routes())
// 路由重定向
// router.redirect('/admin', '/user', 301)
router.get('/list',async (ctx, next)=>{
    ctx.body = await ctx.render('list.html',{users:users});
})
const render = Swig({
    root:__dirname + '/views', // 模板存放目录
    autoescape: true, // 是否启用编码
    cache: false, // 测试本地开发环境不启用缓存，
    ext: '.html' // 模板文件名后缀
});

app.context.render = co.wrap(render)
//监听当前服务地址端口
app.listen(3009)