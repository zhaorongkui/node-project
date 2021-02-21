/*
 * @Descripttion: 
 * @version: 
 * @Author: rkz
 * @Date: 2021-01-24 10:20:38
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-11 15:05:03
 */
(async () => {
    const mysql = require('mysql2/promise')
    const cfg = {
        host: 'localhost',
        user: 'root',
        password: '123456',// 修改为你的密码
        database: 'kaikeba', // 要存的数据库
    }
    // 建立链接
    const connection = await mysql.createConnection(cfg);

    let ret = await connection.execute(`
        CREATE TABLE IF NOT EXISTS test (
            id INT NOT NULL AUTO_INCREMENT,
            message VARCHAR(45) NULL,
        PRIMARY KEY (id))
    `)
    // console.log('create', ret)
    // ret = await connection.execute(`
    //         INSERT INTO test(message)
    //         VALUES(?)
    // `,['ABC'])
    // console.log(JSON.stringify(ret[0]))
    const [rows, fields] = await connection.execute(`
    SELECT * FROM test`)
    console.log('select:', JSON.stringify(rows), fields)
    // connection.end()

})()
