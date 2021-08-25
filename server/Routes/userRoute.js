const {User}=require('../Models/userModel')
const router=require('express').Router()
const jwt=require('jsonwebtoken')

router.post('/registerUser',async(req,res)=>{
    try{
        const userExist=await User.findOne({userName:req.body.userName})
        if(userExist!==null){
            return res.status(409).send('UserName already exist')
        }
        else{
            const newUser=await new User(req.body)
            await newUser.save()
            console.log(newUser)
            res.send(newUser)
        }
    }
    catch(err){
        if(err.name==='ValidationError'){
            res.status(409).send(err.message)
        }
        else{
            res.sendStatus(500)
        }
    }
})
router.post('/signinUser',async(req,res)=>{
    try{
        const userExist=await User.findOne({userName:req.body.userName})
        if(userExist===null){
            return res.status(409).send('User not found')
        }
        else{
            if(await userExist.validatePassword(req.body.password)){
                const token=await jwt.sign(req.body,process.env.SECRET)
                return res.send({token:token})
            }
            else{
                return res.status(409).send('Invalid Password')
            }
        }
    }
    catch(err){
        res.sendStatus(500)
    }
})
router.post('/verifyUser',async(req,res)=>{
    try{
        const isValid=await jwt.verify(req.body.token,process.env.SECRET)
        return res.send('Success')
    }
    catch(err){
        res.sendStatus(500)
    }
})
module.exports=router;