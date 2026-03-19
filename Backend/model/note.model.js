let mongoose=require('mongoose');

let noteSchema=mongoose.Schema({ //Defined Schema
    title:String,
    description:String,
})

let noteModel=mongoose.model("newnotes",noteSchema);//Given Name to the collection of notes

module.exports=noteModel;