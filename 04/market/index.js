/*
 * @Descripttion: 
 * @version: 
 * @Author: rkz
 * @Date: 2021-02-15 16:00:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-09 11:39:48
 */
// const request = require("request");
const express = require('express');
const app = express();
const path = require('path');
const { get } = require('request');
const mongo = require('./models/db');
const objectId = require('mongodb').ObjectID;

// 允许express处理提交过来的数据
app.use(express.json());
// const testdata = require('.models/testdata');

app.get("/", (req, res) => {
    res.sendFile(path.resolve('./index.html'));
});
app.get('/api/list', async (req, res) => {
    // 分頁查詢
    const page = +req.query.page; // 页码
    const name = req.query.name; // 查询水果名称
    try {
        const col = mongo.col("fruits");
        const total = await col.find().count();
        const fruits = await col
            .find(name ? { name: name } : {}) // 当name有值，查name,没有值，传{}
            // 跳跃到
            .skip((page - 1) * 10)
            .limit(10)
            .toArray();
        res.json({ ok: 1, data: { fruits, pagination: { total, page } } });
    } catch (error) {
        console.log(error);
    }
});
app.get('/api/infoById', async (req, res) => {
    console.log(req.query);
    const id = req.query.id;
    try {
        const col = mongo.col("fruits");
        const fruitInfo = await col.findOne({ _id: objectId(id) });
        console.log(fruitInfo);
        res.json({ status: '0', data: fruitInfo });
    } catch (error) {
        console.log(error);
    }
});
// 新增数据
app.post('/api/add', async (req, res) => {
    const data = req.body;
    console.log('新增数据', data);
    try {
        const col = mongo.col("fruits");
        await col.insertOne({
            name: data.name,
            price: parseFloat(data.price),
            category: data.category,
            website: data.website,
            introduction: data.introduction
        });
        res.json({ status: '0', data: null, message: '新增成功' });
    } catch (error) {
        console.log(error);
    }
});
// 修改数据

app.post("/api/check", async (req, res) => {
    console.log('修改数据', req.body);
    const col = mongo.col("fruits");
    await col.updateOne(
        { _id: objectId(req.body.id) },
        {
            $set: {
                name: req.body.name,
                price: parseFloat(req.body.price),
                category: req.body.category,
                website: req.body.website,
                introduction: req.body.introduction
            }
        }
    );
    res.json({ status: '0', data: null, message: '修改成功！' });
});
// 删除数据
app.delete('/api/delete', async (req, res) => {
    const data = req.query;
    console.log('删除数据', data);
    try {
        const col = mongo.col("fruits");
        // await col.deleteOne({ _id: data.id }) // 没法根据主键删除
        await col.deleteOne({ name: data.name });
        res.json({ status: '0', data: null, message: '删除成功' });
    } catch (error) {
        console.log(error);
    }
});

// 两个表查询
app.get('/api/product', async (req, res) => {
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
        console.log('000000000', await data);
        res.json({ ok: 1, data: { data } });
    } catch (e) {
        console.log(e);
    }
});

app.listen(3009);
// cd 到market 文件夹， 输入node index 回车起服务，