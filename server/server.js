const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const env=require('dotenv')

const app=express()
env.config()
const {mongoose}=require('./DB_Connection')
const port=process.env.PORT || 8080
const allowedOrigin=['http://localhost:3000']
const corsOption={
    credentials:true,
    origin:function(origin,callback){
        if(allowedOrigin.indexOf(origin)!==-1 || !origin){
            callback(null,true)
        }
        else{
            callback(new Error('Not Allowed By CORS'))
        }
    }
}
app.use(cors(corsOption))
app.use(bodyParser.json())
const userRoute=require('./Routes/userRoute')
app.use('/',userRoute)
app.listen(port,()=>console.log(`Server start at port ${port}`))
