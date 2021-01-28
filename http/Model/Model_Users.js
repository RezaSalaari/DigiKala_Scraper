const mongoose = require('mongoose')


var usersSchema = new mongoose.Schema({
    id:{type:String},
    Message : {type:String}
  
})


usersSchema.statics.userSaveMethod= async(data)=>
{
   try {
       return await new Model_User(data).save()
   } catch (error) {
     console.log('Cannot Save'+error)  
   }

}

usersSchema.statics.findSearch= async(id)=>{
    
        try {
            return await Model_User.findOne({id : id})
        } catch (error) {
            console.log(error)
        }
}

usersSchema.statics.findbyIdandUpdate = async(id,data)=>{
    let edituser = await Model_User.findByIdAndUpdate(id , data )
    return edituser ; 
}

var Model_User = mongoose.model('user_info',usersSchema)

   
module.exports =Model_User