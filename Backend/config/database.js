let mongoose=require('mongoose');

function ConnectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database Is Connected Successfully")
    })
}

module.exports=ConnectToDB;