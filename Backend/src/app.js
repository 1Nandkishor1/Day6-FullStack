let express = require("express");
let app = express();
let noteModel = require("../model/note.model");
app.use(express.json());
let cors = require("cors"); //Important for cross web connection=>A browser Security rule
app.use(cors()); //If we do not use this CORS policy error will occur=>A web site in itself can not ask connection for f
let path=require("path"); 
app.use(express.static("./public/dist"));//1..use=>Used to regester middleware  2.Inside .use() we specify middleware method

app.post("/notes", async (req, res) => {
  let { title, description } = req.body;
  let note = await noteModel.create({ title, description }); //almost all CRUD functions are used with async-await
  res.status(201).json({
    message: "Data Stored Successfully",
    note,
  });
});

app.get("/notes", async (req, res) => {
  let note = await noteModel.find();
  res.status(200).json({
    message: "Data Fetched Succesfully",
    note, //.find()=>Always Return Data In Array Of Object Format (Remember)
  });
});

app.delete("/notes/:id", async (req, res) => {
  let id = req.params.id; //Just For Understanding=>req = { params:{...}, body:{...}, query:{...}, headers:{...}, method:"GET", url:"/notes/101" };

  await noteModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "Data Delted Successfully",
  });
});

app.patch("/notes/:id", async (req, res) => {
  let id = req.params.id;
  let { description } = req.body;
  await noteModel.findByIdAndUpdate(id, { description });
  res.status(200).json({
    message: "Data Updated Successfully",
  });
});

app.use('*name',(req,res)=>{ //This is Middle-ware route primarily used for using both frontend and backend on same port
    res.sendFile(path.join(__dirname ,"..", "/public/dist/index.html")); //Wildcard 
})




module.exports = app;
