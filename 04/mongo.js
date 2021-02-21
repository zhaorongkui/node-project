/*
 * @Descripttion: 
 * @version: 
 * @Author: rkz
 * @Date: 2021-02-14 11:50:25
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-15 12:35:31
 */
(async () => {
    // const abc = require("mongodb")

    const {MongoClient: MongoDB} = require('mongodb');
    const client = new MongoDB(
        'mongodb://localhost:27017',
        {
            useNewUrlParser:true
        }
    );
    let ret
    // 创建连接
    ret = await client.connect();
    // console.log('ret------',ret);
    const db = client.db('test');
    const fruits = db.collection('fruits');
    // 插入一条数据
    ret = await fruits.insertOne({
        name: '芒果',
        price: 29.99,
        json:{
            total:30.5
        }
    })
    // console.log('insert',JSON.stringify(ret));
    // 查询数据
    ret = await fruits.findOne();
    // console.log('find',ret);

    // 更新操作，update
    // ret = await fruits.update({name: '芒果'},{
    //     $set:{
    //         name: '苹果'
    //     }
    // });
    // console.log('update',JSON.stringify(ret));

    // 删除操作
    ret = await fruits.deleteOne({name:'苹果'})
    // ret = await fruits.deleteMany()
})()
