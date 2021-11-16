/*
 * @Author: your name
 * @Date: 2021-11-16 16:46:52
 * @LastEditTime: 2021-11-16 18:27:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \node-project\data02\app.js
 */
const express = require('express');
const app = express();

const debug = (req, res, next) => {
  console.log('middleware,debug ->', req.method, req.url);
  next();
};
app.use(debug);

app.get('/', (req, res) => {
  console.log('->', req.url);
  res.send('<h1>Hello</h1>');
});

app.get('/blog', (req, res) => {
  res.redirect('/');
});

app.get('/json', (req, res) => {
  res.json({
    result: 'ok'
  });
});

app.get('/sitemap', (req, res) => {
  res.redirect(301, '/');
});

app.get('/adult', (req, res) => {
  res.status(404).end();
});

app.get('/error', (req, res) => {
  throw "System Error!";
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error("我去，出错了！",);
  }
  console.log("正常服务中……", "http://127.0.0.1:" + PORT);
});