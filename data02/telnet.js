/*
 * @Descripttion: 
 * @version: 
 * @Author: rkz
 * @Date: 2021-01-16 09:10:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-16 09:51:54
 */
const net = require('net');
const chartServer = net.createServer();
const clientList = [];
// console.log(net)
chartServer.on('connection',client => {
    client.write('Hi\n');
    clientList.push(client);
    client.on('data',data =>{
        console.log('receive',data.toString());
        clientList.forEach(v => {
            v.write(data)
        })
    })
})
chartServer.listen(9000)