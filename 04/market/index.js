/*
 * @Descripttion: 
 * @version: 
 * @Author: rkz
 * @Date: 2021-02-15 16:00:41
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-10-31 14:39:27
 */
// const request = require("request");
const express = require('express');
const app = express();
const path = require('path');
const { get } = require('request');
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
            price: parseFloat(data.price),
            category: data.category,
        })
        res.json({ status: '0', data: null, message: '新增成功' })
    } catch (error) {
        console.log(error)
    }
})
// 修改数据

app.post("/api/check", async (req, res) => {
    console.log('6666666666', req.body)
    const col = mongo.col("fruits");
    await col.update(
        { name: req.body.name },
        { category: req.body.category},
        {
            $set: { check: !req.body.check }
        }

    )
    res.json({ status: '0', data: null, message: '修改成功！' })

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

// 两个表查询
app.get('/api/product', async(req, res) => {
    const productdb = mongo.col("product");
    const orderdb = mongo.col("order");
    const userdb = mongo.col("user");
    const col = await mongo.col("fruits");
    try {
        let data = await mongo.col('order').aggregate([
            // {
            //     $group:{
            //         _id: '$productname',
            //         rs: {$sum: "$price"}
            //     }
            // }
            {
                $lookup:
                {
                    from: "productdb",
                    localField: "pid",
                    foreignField: "_id",
                    as: "inventory_docs"
                }
            },
            
        ]).limit(10).toArray();
        console.log('000000000',await data);
        res.json({ ok: 1, data: { data}})
    } catch(e){
        console.log(e)
    }
})

app.listen(3009);
// cd 到market 文件夹， 输入node index 回车起服务，