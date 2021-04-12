/*
 * @Descripttion: 
 * @version: 
 * @Author: rkz
 * @Date: 2021-02-15 11:07:58
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-28 20:32:11
 */
const { mongo } = require("mongoose");
const mongodb = require("./db");

mongodb.once("connect", async () => {
  const col = mongodb.col("fruits");
  const student = mongodb.col('student');
  const classes = mongodb.col('classes');
  const order = mongodb.col('order');
  const product = mongodb.col('product');
  const user = mongodb.col('user');

  try {
    // 删除已存在
    await col.deleteMany();
    await student.deleteMany();
    await classes.deleteMany();
    await order.deleteMany();
    await product.deleteMany();
    await user.deleteMany();

    // 插入
    await col.insertMany([
      { name: "苹果", price: 5, category: "水果", check: false },
      { name: "香蕉", price: 3.5, category: "水果", check: false },
      { name: "芒果", price: 15, category: "水果", check: false },
      { name: "砂糖橘", price: 8, category: "水果", check: false },
      { name: "土豆", price: 2, category: "蔬菜", check: false },
      { name: "西红柿", price: 3, category: "蔬菜", check: false },
      { name: "茄子", price: 4, category: "蔬菜", check: false },
      { name: "韭菜", price: 5, category: "蔬菜", check: false },
      { name: "牛肉", price: 30, category: "生鲜", check: false },
      { name: "鱼", price: 12, category: "生鲜", check: false },
      { name: "大闸蟹", price: 99, category: "生鲜", check: false },
      { name: "鲜虾", price: 20, category: "生鲜", check: false },
      { name: "帶魚", price: 99, category: "生鲜", check: false },
      { name: "鲍鱼", price: 20, category: "生鲜", check: false },
      { name: "龙虾", price: 99, category: "生鲜", check: false },
    ]);
    await student.insertMany([
      { id: 1, name: '张三', classId: 1, age: 18, number: 11 },
      { id: 2, name: '李四', classId: 1, age: 19, number: 12 },
      { id: 3, name: '赵五', classId: 2, age: 20, number: 13 },
    ])
    await classes.insertMany([
      { id: 1, name: '一年级1班' },
      { id: 2, name: '二年级2班', },
      { id: 3, name: '一年级2班', }])

    await user.insertMany([
      { "_id": 1, "username": '小强' },
      { "_id": 2, "username": '小红'  }])

    await product.insertMany([
      { "_id": 1, "productname": "商品1", "price": 15 },
      { "_id": 2, "productname": "商品2", "price": 36 }])

    await order.insertMany([
      { "_id": 1, "pid": 1, "ordername": "订单1", "uid": 1 },
      { "_id": 2, "pid": 2, "ordername": "订单2", "uid": 2 },
      { "_id": 3, "pid": 2, "ordername": "订单3", "uid": 2 },
      { "_id": 4, "pid": 1, "ordername": "订单4", "uid": 1 }])
    console.log("插入测试数据成功");
    // const ret = await col.find({price:{$gt:10}}).toArray()
    const ret = await col.find().toArray()
    console.log('ret888888---------', ret)

  } catch (error) {
    console.log("插入测试数据失败");
    console.log(error);
  }
});