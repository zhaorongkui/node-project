/*
 * @Descripttion: 
 * @version: 
 * @Author: rkz
 * @Date: 2021-01-16 16:44:49
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-16 17:03:27
 */
const originRequest = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

function request(url, callback) {
  const options = {
    url: url,
    encoding: null
  };
  originRequest(url, options,callback);
}

for (let i = 100553; i < 100563; i++) {
  const url = `https://www.dy2018.com/i/${i}.html`;
  request(url, function(err, res, body) {
    const html = iconv.decode(body, "gb2312");
    const $ = cheerio.load(html);
    console.log($(".title_all h1").text());
  });
}