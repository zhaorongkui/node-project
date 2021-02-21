/*
 * @Descripttion: 
 * @version: 
 * @Author: rkz
 * @Date: 2021-02-15 10:42:38
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-15 10:45:13
 */
const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();
event.on('some_event', num => {
    console.log('event' + num)
})
let num = 0;
setInterval(() => {
    event.emit('some_event', num++)
},1000)