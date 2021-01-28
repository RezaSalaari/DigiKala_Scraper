const mongoose = require('mongoose')
var redis = require("redis");
const client = redis.createClient();
const config = require('./Config/DataBase')


module.exports = class Robot{
constructor(){
    this.run()
}
    async run(){
        await this.setUpmongoose();
        await this.setonRedis()
    }
    setUpmongoose(){
        mongoose.connect(config.Mongo.url_mongo,config.Mongo.option).then(res=>{
            console.log('Connect To DataBase'+res)
        }).catch(err=>{
            console.log(err)
        })
       }
       
    setonRedis(){
        client.on("connect", function() {
            console.log("You are now connected");
          });
    }
    }
