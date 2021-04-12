/*
 * @Descripttion: 
 * @version: 
 * @Author: rkz
 * @Date: 2021-02-14 11:50:25
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-11 20:55:02
 */
(async () => {
    // const abc = require("mongodb")

    const { MongoClient: MongoDB } = require('mongodb');
    const client = new MongoDB(
        'mongodb://localhost:27017',
        {
            useNewUrlParser: true
        }
    );
    let ret
    // 创建连接
    ret = await client.connect();
    // console.log('ret------',ret);
    const db = client.db('test');
    const fruits = db.collection('fruits');
    const produces = db.collection('produces');
    const orders = db.collection('orders');
    // 插入一条数据
    ret = await fruits.insertOne({
        name: '芒果',
        price: 29.99,
        json: {
            total: 30.5
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
    ret = await fruits.deleteOne({ name: '苹果' })
    // ret = await fruits.deleteMany()

    await produces.deleteMany();
    ret = await produces.insertOne({ id: 1, productname: "商品1", price: 15 });
    ret = await produces.insertOne({ id: 2, productname: "商品2", price: 36 });

    await orders.deleteMany();
    ret = await orders.insertOne({ "id": 1, "pid": 1, "ordername": "订单1" });
    ret = await orders.insertOne({ "id": 2, "pid": 2, "ordername": "订单2" });
    ret = await orders.insertOne({ "id": 3, "pid": 2, "ordername": "订单3" });
    ret = await orders.insertOne({ "id": 4, "pid": 1, "ordername": "订单4" });


    // let aa = await db.collection('orders').aggregate([
    //     { $match: { ordername: '订单3' } }
    //     // {
    //     //     $lookup:
    //     //     {
    //     //         from: "orders",
    //     //         localField: "_id",
    //     //         foreignField: "pid",
    //     //         as: "inventory_docs"
    //     //     }
    //     // }
    // ])
    // let ord = await orders.find().toArray();
    // let prd = await produces.find().toArray()
    // console.log('链接成功', JSON.stringify(ret))
    // console.log('链接成功', JSON.stringify(prd))

   produces.aggregate([
            // { $match: { productname: "商品2" } }
            {
                $lookup:
                {
                    from: "$orders",
                    localField: "$_id",
                    foreignField: "$pid",
                    as: "$inventory_docs"
                }
            }
        ],(err,data)=>{
            console.log('链接成功111',data)
        })
    // console.log('链接成功', aa)


})()
