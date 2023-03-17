/*
 * @Descripttion: 
 * @version: 
 * @Author: rkz
 * @Date: 2021-02-15 10:40:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-19 22:26:03
 */
// const conf = require('./conf')
// const EventEmitter = require('events').EventEmitter;
// const MongoClient = require('mongodb').MongoClient;
// class Mongodb {
//     constructor(conf) {
//         this.conf = conf;
//         this.emmiter = new EventEmitter();
//         // 連接
//         this.client = new MongoClient(conf.url, {
//             useNewUrlParser: true
//         });
//         this.client.connect(err => {
//             if (err) throw err
//             console.log('連接成功');
//             this.emmiter.emit('connect')
//         })
//     }
//     col(colName, dbName = conf.dbName) {
//         return this.client.db(dbName).collection(colName)
//     }
//     once(event, db) {
//         this.emmiter.once(event.cb)
//     }
// }
// module.exports = new Mongodb(conf);
const conf = require("./conf");
const EventEmitter = require("events").EventEmitter;

// 客户端
const MongoClient = require("mongodb").MongoClient;

class Mongodb {
  constructor(conf) {
    // 保存conf
    this.conf = conf;

    this.emmiter = new EventEmitter();
    // 连接
    this.client = new MongoClient(conf.url, { useNewUrlParser: true, useUnifiedTopology: true });
    this.client.connect(err => {
      if (err) throw err;
      console.log("连接成功");
      this.emmiter.emit("connect");
    });
  }
  col(colName, dbName = conf.dbName) {
    return this.client.db(dbName).collection(colName);
  }

  once(event, cb) {
    this.emmiter.once(event, cb);
  }
}
// 2.导出db
module.exports = new Mongodb(conf);