
let app=require('./src/app');
require('dotenv').config();
let ConnectToDB=require('./config/database');

app.listen(3000,()=>{
    console.log("Server is Running On Port 3000");
})

ConnectToDB();