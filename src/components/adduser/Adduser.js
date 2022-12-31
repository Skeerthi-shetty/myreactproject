import React,{useState,useEffect} from 'react';
import './Adduser.css';
import {Modal,Button} from 'react-bootstrap';

import {useForm} from 'react-hook-form';
//import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Adduser() {
  
   //navigate hook
   //let navigate=useNavigate();
   
   let {
    register,
    handleSubmit,
    formState:{errors},
    setValue,getValues
   } = useForm();

   //modal state
   let[show,setShow]=useState(false);

   let showModal=()=>setShow(true);
   let closeModal=()=>setShow(false);
  

   //http request error state
   let[err,setErr]=useState("");
   let [todos,setTodos]=useState([]);

   //edit todo
   let editObj=(todoObj)=>{
        showModal();
        //fill input fields with todo details
        setValue("name",todoObj.name);
        setValue("time",todoObj.time);
        setValue("deadline",todoObj.deadline);
        setValue("image",todoObj.image);



   }

   //todo to edit state
   let[todoToEdit,setTodoToEdit]=useState({});

   //get todos function
    let getTodos=()=>{
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
    };

   //save todo
   let saveObj=()=>{
     closeModal();
     //get modified object
     let modifiedTodo=getValues();
     console.log(modifiedTodo);
     //get id for modified user
     modifiedTodo.id=todoToEdit.id;
     //make HTTP PUT req to save modified user
     axios.put(`http://localhost:4000/Todos/${modifiedTodo.id}`,modifiedTodo)
     .then(res=>{
      if(res.status===200){
       
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

   }

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


   let addNewTodo=(newTodo)=>{
     //save todo in json server
     axios.post("http://localhost:4000/Todos",newTodo)
     .then(response=>{
        if(response.status===201){
          setErr("");  
          //navigate to todos component
         
        }
     })
     .catch(err=>{
      //the client was given an error response
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

   };

  return (
    <div>
      <p className="display-4 text-center mt-5 heading">Add New Todo</p>
      {/*HTTP error message*/}
      {err.length!==0&&<p className="display-4 fw-bold text-center text-danger">{err}</p>}
      {/*responsive form*/}
      <div className="row">
        <div className="col-11 col-sm-10 col-md-7 mx-auto">
          <form onSubmit={handleSubmit(addNewTodo)}>
            {/*Name of Todo*/}
            <div className='mb-3'>
             <label htmlFor='name'  className='fs-5 '>NameOf Todo</label>
             <input 
               type="text"
               id="name"
               className='form-control'
               {...register("name",{required:true})}/>
              {errors.name?.type==="required"&&<p className="text-danger fw-bold fs-6">*Name is Required</p>}  
            </div>
            {/*Time taken for completion of the particular todo*/}
            <div className='mb-3 '>
             <label htmlFor='time' className='fs-5 '>TimeTaken</label>
             <input 
               type="number"
               id="time"
               className='form-control'
               {...register("time",{required:true})}/>
              {errors.time?.type==="required"&&<p className="text-danger fw-bold fs-6">*Time taken is Required</p>}  
            </div>
            {/*Deadline*/}
            <div className='mb-3'>
             <label htmlFor='deadline'  className='fs-5 '>Deadline</label>
             <input 
               type="date"
               id="deadline"
               className='form-control'
               {...register("deadline",{required:true})}/>
              {errors.deadline?.type==="required"&&<p className="text-danger fw-bold fs-6">*Deadline is Required</p>}  
            </div>
            {/*image of Todo*/}
            <div className='mb-3'>
             <label htmlFor='image'  className='fs-5 '>Image Url</label>
             <input 
               type="text"
               id="image"
               className='form-control'
               {...register("image",{required:true})}/>
              {errors.image?.type==="required"&&<p className="text-danger fw-bold fs-6">*Image is Required</p>}  
            </div>
            {/*Submit Button*/}
            <button type="submit" className='btn btn-dark new-todo-button'>Create New Todo</button>
            </form>
        </div>
      </div>
      <p className='display-4 text-center text-danger'>{err}</p>
      <div className='row row-cols-1 row-cols-sm-1 row-cols-md-3 g-3'>
        {
          todos.map((todoObj)=><div className="col" key={todoObj.id}>
          <div className="card todo-card"><img src={todoObj.image} className="mx-auto p-3 todo-image" alt=""/>
            <div className="card-body todo-card-body ">
              <p className="fs-5 lead fw-semibold name-todo ">Name : {todoObj.name}</p>
              <p className=" fs-5 lead fw-semibold time-todo">Time : {todoObj.time}</p>
              <p className=" fs-5 lead fw-semibold deadline-todo">Deadline : {todoObj.deadline}</p>
              <button  className="btn btn-dark "onClick={()=>editObj(todoObj)}>Edit</button> 
            </div>
           
          </div>
            </div>)
        }
      </div>
     <Modal show={show}
     onHide={closeModal}
     backdrop="static"
     centered
     className="modal">
      <Modal.Header>
        <Modal.Title>Edit Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={handleSubmit(addNewTodo)}>
            {/*Name of Todo*/}
            <div className='mb-3'>
             <label htmlFor='name'  className='fs-5 '>NameOf Todo</label>
             <input 
               type="text"
               id="name"
               className='form-control'
               {...register("name")}/>
               
            </div>
            {/*Time taken for completion of the particular todo*/}
            <div className='mb-3 '>
             <label htmlFor='time' className='fs-5 '>TimeTaken</label>
             <input 
               type="number"
               id="time"
               className='form-control'
               {...register("time")}/>
       
            </div>
            {/*Deadline*/}
            <div className='mb-3'>
             <label htmlFor='deadline'  className='fs-5 '>Deadline</label>
             <input 
               type="date"
               id="deadline"
               className='form-control'
               {...register("deadline")}/>
      
            </div>
            {/*image of Todo*/}
            <div className='mb-3'>
             <label htmlFor='image'  className='fs-5 '>Image Url</label>
             <input 
               type="text"
               id="image"
               className='form-control'
               {...register("image")}
               disabled/>
             
            </div>
            {/*Submit Button*/}
            
            </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={saveObj}>Save</Button>
      </Modal.Footer>
     </Modal>
    </div>
  )
}

export default Adduser;








