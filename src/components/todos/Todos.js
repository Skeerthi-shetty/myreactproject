import React,{useState,useEffect} from 'react'
import './Todos.css'
import axios from 'axios';
function Todos() {

  //todos state
  let [todos,setTodos]=useState([]);

  //HTTP error state
  let [err,setErr]=useState("");

  //side effect
  useEffect(()=>{
    //fetch todos
    axios.get("http://localhost:4000/Todos")
    .then(response=>{
      if(response.status===200){
        setTodos(response.data);
      }
    })
    .catch(err=>{
      if(err.response){
        setErr(err.message);
      }
      //the client recieved a response and the request was never left
      else if(err.request){
        setErr(err.message);      
      }
      //other errors
      else{
        setErr(err.message);   
      }
    })
  },[])
  return (
    <div>
      <p className='display-4 text-center text-danger'>{err}</p>
      <div className='row row-cols-1 row-cols-sm-1 row-cols-md-3 g-3'>
        {
          todos.map((todoObj)=><div className="col" key={todoObj.id}>
          <div className="card todo-card"><img src={todoObj.image} className="mx-auto p-3 todo-image" alt=""/>
            <div className="card-body todo-card-body ">
              <p className="fs-5 lead fw-semibold name-todo ">Name : {todoObj.name}</p>
              <p className=" fs-5 lead fw-semibold time-todo">Time : {todoObj.time}</p>
              <p className=" fs-5 lead fw-semibold deadline-todo">Deadline : {todoObj.deadline}</p>
            </div>
          </div>
            </div>)
        }
      </div>
    </div>
  )
}

export default Todos;
