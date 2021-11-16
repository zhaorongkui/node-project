<!--
 * @Descripttion: 
 * @version: 
 * @Author: rkz
 * @Date: 2021-01-16 09:05:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-16 18:32:55
-->
<!-- 初始化npm init -y -->
<!-- npm i -g nodemon -->
<!-- crul -v http://www.baidu.com -->
<!-- npm i express -->
<!-- npm i live-server -g -->
<!-- npm i mysql --save -->
<!-- docker运行 -->
 docker-compose up

 docker ps -a查看当前运行下的镜像进程

docker stop 镜像ID 停止某个镜像；
docker rm 镜像ID   来删除这个镜像

docker ps -a命令查看当前进程里面是否还有刚删除相关的进程：

docker images查看下镜像的IMAGE ID，进行最后的删除。

docker rmi 镜像id 删除镜像：

使用docker images查看下是否删除掉了要删除的镜像

 Windows Terminal

 <!-- 03 -->
 cnpm i mysql --save

 本地测试项目没已经上传git

 node 搭建的后端测试test 项目，启动方式为，cd到当前文件夹下，node 文件名启动
 
 nano app.js // 服务器上打开app.js ,用于编辑app.js

 编辑完成后 ctrl+x 退出保存

 如果容器被占用
 docker container rm myweb

 端口被占用
 netstat -tanlp

 杀死被占用的进程
 kill 869（pid）


 # Dockerfile
 FROM node:16.13.0-alpine3.12
 # Create app directory
 WORKDIR /usr/src/app

 COPY package*.json ./

 RUN npm install

 COPY . .

 EXPOSE 3000

 CMD ["node", "app.js"]

 ```bask
 docker build -t komavideo/myweb:latest . // docker拉去镜像（）
 docker image ls
 docker run --name myweb -p 80:3000 -d  --restart=always komavideo/myweb:latest // docker启动服务
 docker container ls -a
 docker logs -f myweb
 docker container stop myweb // 停止容器
 docker container rm myweb  // 删除容器
 docker ps