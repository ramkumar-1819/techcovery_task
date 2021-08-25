const mongoose=require('mongoose'),Schema=mongoose.Schema
const bcrypt=require('bcrypt')

const userSchema=new Schema({
    userName:{type:String,required:true},
    password:{type:String,required:true,set:bcryptPassword}
})
//Bcrypt the password
function bcryptPassword(password){
    return bcrypt.hashSync(password,10)
}
//validating the password
userSchema.methods.validatePassword=function(password){
    return bcrypt.compareSync(password,this.password)
}
const User=mongoose.model('User',userSchema)
module.exports={User}