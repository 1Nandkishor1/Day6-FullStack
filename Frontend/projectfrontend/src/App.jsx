import React, { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";



const App = () => {
  const [note, setnote] = useState([]) //Remember React changes state when such hooks are used it doesnt changes state if normal variable value changes
  const [update, setupdate] = useState(false)
  const [formdata, setformdata] = useState({})
  const [id, setid] = useState(null)


  function submitHandler(e) {
    e.preventDefault();
    if(!update){
    let { title, description } = e.target.elements;// 1.target=>Whole Form  2.elements=>Each Element of form(html) 3.value=>Value of Each Html compnenet
    axios.post("https://day6-fullstack.onrender.com/", {
      title: title.value,
      description: description.value
    })
      .then((res) => {
        console.log(res.data);
        fetchNotes();

      })
    }
    else{
      axios.patch("https://day6-fullstack.onrender.com/"+id,formdata)
      .then((res)=>{
        console.log(res.data);
        setupdate(false);
        setformdata({title:"", description:""})
        fetchNotes();
        
      })

    }


  }

  function deleteHandler(id) {
    axios.delete("https://day6-fullstack.onrender.com/" + id)
      .then((res) => {
        console.log(res.data);
        fetchNotes();

      })
  }

  function updateHandler(id, title, description) {
    setupdate(true); 
    console.log(id, title, description);
    setid(id);
    setformdata({
      "title":title,
      "description":description
    })
    console.log(formdata);




  }

  function changeHandler(e){
    setformdata({
      ...formdata,
      [e.target.name]:e.target.value
    })

  }

  function fetchNotes() {
    axios.get("https://day6-fullstack.onrender.com/") //axios=>A library and .get is method of that (1.it sends HTTP request to .get route of server,2.We can also Use .fetch)
      .then((res) => {
        console.log(res.data); //res.data=>It Caontains the main object sent by backend
        return setnote(res.data.note)
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchNotes();
  }, []);






  return (
    <>
      <form className='form-data' onSubmit={submitHandler} >
        <input 
        name='title'
        value={formdata.title} 
        onChange={changeHandler}
        type="text" 
        placeholder='Enter Title' />

        <input 
        name='description' 
        value={formdata.description}
        onChange={changeHandler}
        type="text" 
        placeholder='Enter Description' />

        {update? <button>Update</button>:<button>Add Note</button>}
      </form>

      <div className='notes'>
        {note.map((res) => {
          return <div className='note'>
            <h1>{res.title}</h1>
            <h1>{res.description}</h1>
            <button onClick={() => {
              deleteHandler(res._id);
            }}>Delete</button>
            <button onClick={() => { updateHandler(res._id,res.title,res.description) }}>Update</button>

          </div>
        })}
      </div>
    </>

  )
}

export default App