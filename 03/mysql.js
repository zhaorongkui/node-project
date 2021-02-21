/*
 * @Descripttion: 
 * @version: 
 * @Author: rkz
 * @Date: 2021-01-24 10:08:28
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-24 18:18:54
 */
const mysql = require("mysql");
// 连接配置
const cfg = {
  host: "localhost",
  user: "root", 
  password: "123456", // 修改为你的密码
  database: "kaikeba" // 请确保数据库存在
};
// 创建连接对象
const conn = mysql.createConnection(cfg);
// console.log(conn);
// 连接
conn.connect(err => {
    if (err) {
      throw err;
    } else {
      console.log("连接成功！");
    }
  });