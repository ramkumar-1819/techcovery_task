const mongoose=require('mongoose')
console.log(process.env.URL)
mongoose.connect(process.env.URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(result=>console.log('DB Connection made Successfully'))
.catch(err=>console.log('Failed to Connected to DB',err))

module.exports={mongoose}