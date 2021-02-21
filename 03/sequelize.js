/*
 * @Descripttion: 
 * @version: 
 * @Author: rkz
 * @Date: 2021-01-26 19:41:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-12 09:26:19
 */
(async () => {
    const { Sequelize, Model, DataTypes } = require("sequelize");
    // 建立链接
    const sequelize = new Sequelize("kaikeba", "root", '123456', {
        host: "localhost",
        dialect: "mysql",
        operatorsAliases: false,
        // 配置数据库可以插入汉字
        define: {
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci',
            },
            timestamps: true,

        }
    });
    // 定义模型
    const Fruit = sequelize.define("Fruit", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            // get() {
            //     const fname = this.getDataValue("name");
            //     const price = this.getDataValue("price");
            //     const stock = this.getDataValue("stock");
            //     return `${fname}(价格：￥${price} 库存：${stock}kg)`;
            // }
        },
        price: {
            type: DataTypes.FLOAT, allowNull: true,
            validate: {
                isFloat: { msg: '价格字段请输入数字！' },
                min: { args: [0], msg: "价格字段必须大于0" }
            }
        },
        stock: { type: DataTypes.INTEGER, defaultValue: 0 }
    }, {
        // 第三参数
        // 时间戳，false默认不显示
        // timestamps: false,
        getterMethods: {
            amount() {
                return this.getDataValue("stock") + "kg";
            }
        },
        setterMethods: {
            amount(val) {
                const idx = val.indexOf('kg');
                const v = val.slice(0, idx);
                this.setDataValue('stock', v);
            }
        }
    });
    Fruit.classify = function(name){
        const tropicFruits = ['香蕉','芒果','椰子'];
        return tropicFruits.includes(name) ? '热带水果' : '其他水果';

    };
    Fruit.prototype.totalPrice = function (count) {
        return (this.price * count).toFixed(2);
    };
    ['香蕉','草莓'].forEach(f => 
        console.log(f + '是' + Fruit.classify(f))
    );
    // 表强制刷新
    let ret = await Fruit.sync({ force: true });
    ret = await Fruit.create({
        name: "香蕉",
        price: 3.5
    })

    // ret = await Fruit.findAll();
    // console.log('findAll: ', JSON.stringify(ret))
    // console.log('amont: ', ret[0].amount);
    // Fruit.findAll().then(fruits => {
    //     console.log(JSON.stringify(fruits));
    //     fruits[0].amount = '150kg';
    //     fruits[0].save();
    // })

    // 使用实例 的方法
    Fruit.findAll().then(fruits => {
        const [f1] = fruits;
        console.log(`买5kg${f1.name}需要￥${f1.totalPrice(5)}`)
    })

    // 用户表数据
    // const User = sequelize.define("user", {
    //     name: DataTypes.TEXT,
    //     favoriteColor: {
    //         type: DataTypes.TEXT,
    //         defaultValue: 'green'
    //     },
    //     age: DataTypes.INTEGER,
    //     cash: DataTypes.INTEGER
    // });
    // let ret = await User.sync({ force: true });
    // const jane = User.build({name: 'Jane'});
    // await jane.save();
    // // const tome = User.build({name: 'tome'}).save();
    // const jerry =await User.create({name: 'jerry'});
    // jerry.name = 'Ada';
    // // await jerry.reload();
    // await jerry.save();
    // // console.log(jane instanceof User); // true
    // // console.log(jane.name);
    // // await jerry.destroy();
})()