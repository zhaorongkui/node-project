/*
 * @Descripttion: 
 * @version: 
 * @Author: rkz
 * @Date: 2021-02-15 16:00:41
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-19 22:28:27
 */
// const request = require("request");
const express = require('express');
const app = express();
const path = require('path');
const mongo = require('./models/db');

// 允许express处理提交过来的数据
app.use(express.json())
// const testdata = require('.models/testdata');

app.get("/", (req, res) => {
    res.sendFile(path.resolve('./index.html'))
});
app.get('/api/list', async (req, res) => {
    // 分頁查詢
    const page = +req.query.page;
    try {
        const col = mongo.col("fruits");
        const total = await col.find().count();
        const fruits = await col
            .find()
            // 跳跃到
            .skip((page - 1) * 10)
            .limit(10)
            .toArray();
        res.json({ ok: 1, data: { fruits, pagination: { total, page } } })

    } catch (error) {
        console.log(error)
    }
});

// 新增数据
app.post('/api/add', async (req, res) => {
    const data = req.body
    console.log('999999999999', data)
    try {
        const col = mongo.col("fruits");
        await col.insertOne({
            name: data.name,
            price: parseFloat(data.price)
        })
        res.json({ status: '0', data: null, message: '新增成功' })
    } catch (error) {
        console.log(error)
    }

    // .then(res => {
    //     res.json({ status: '0', message: res })
    // })
    // .catch(e => { res.json({ status: 'error', message: e }) })

})
// 删除数据
app.delete('/api/delete', async (req, res) => {
    const data = req.query;
    console.log('777777', data)
    try {
        const col = mongo.col("fruits");
        // await col.deleteOne({ _id: data.id }) // 没法根据主键删除
        await col.deleteOne({ name: data.name })
        res.json({ status: '0', data: null, message: '删除成功' })
    } catch (error) {
        console.log(error)
    }

})
app.listen(3000);