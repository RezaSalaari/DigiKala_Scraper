const mongoose = require('mongoose')


const  userReminder = new mongoose.Schema({
   id:{type:String},
   Url:{type:String}
})

userReminder.statics.userSaveMethod= async(data)=>
{
   try {
       return await new Model_reminder(data).save()
   } catch (error) {
     console.log('Cannot Save'+error)  
   }

}
var Model_reminder = mongoose.model('user_Sites',userReminder)


module.exports =Model_reminder