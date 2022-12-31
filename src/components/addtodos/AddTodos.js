import React,{useState,useEffect} from 'react';
import {useForm} from 'react-hook-form';
import './AddTodos.css';
import { FaPlusCircle } from 'react-icons/fa';
import axios from "axios";
import {Modal,Button} from 'react-bootstrap';
function AddTodos() {
  
    let{register,
        handleSubmit,
        formState:{errors},getValues,setValue}=useForm();
    
    //for errors
    let[err,setErr]=useState("");

    //for todos 
    let[todos,setTodos]=useState([]);

    //for displaying modal

    let[show,setShow]=useState(false);

    let showModal=()=>setShow(true);
    let closeModal=()=>setShow(false);

    //save obj
    let saveObj=()=>{
      closeModal();
      //get modified object
      let modifiedTodo=getValues();
      console.log(modifiedTodo);
      //get id for modified user
      modifiedTodo.id=todoToEdit.id;
      //make HTTP PUT req to save modified user
      axios.put(`http://localhost:4000/todos/${modifiedTodo.id}`,modifiedTodo)
      .then(res=>{
       if(res.status===200){
        getTodos();
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

 
    
    
   //edit todo
   let editObj=(todoObj)=>{
    showModal();
    setTodoToEdit(todoObj);
    //fill input fields with todo details
    setValue("name",todoObj.name);
    setValue("starttime",todoObj.starttime);
    setValue("endtime",todoObj.endtime);
    setValue("category",todoObj.category)
    setValue("status",todoObj.status);
     };

   //todo to edit state
   let[todoToEdit,setTodoToEdit]=useState({});
   
    //save todo in json server
    
    let addNewTodo = (newTodo)=>{
     axios.post("http://localhost:4000/todos",newTodo)
     .then(response=>{
        if(response.status===201){
          setErr("");  
          //navigate to todos component
          getTodos();
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
    
    //delete todo

    const deleteTodo = (todo) => {
      
            // remove user from "users"
            axios.delete(`http://localhost:4000/todos/${todo.id}`)
            .then(res=>{
              if(res.status===200){
                setErr("");
                getTodos();
            
                
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
            
            
    let deleteEverything=()=>{
        for(let obj of todos){
          deleteTodo(obj);
        }
      };
    
           
          
        
     
   
   //getting todos object from api to print in the form of table

   let getTodos=()=>{
    
      axios.get("http://localhost:4000/todos")
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
       }
   
   useEffect(()=>{
    getTodos();
    
   },[]);

  return (
  <div>
   
      {/*HTTP error message*/}

      {err.length!==0&&<p className="display-4 fw-bold text-center text-danger">{err}</p>}



      {/*responsive form*/}
    
      <form onSubmit={handleSubmit(addNewTodo)} >
        <div className="form  gap-3 m-5">

              {/*Name of Todo*/}

          <div >
             <label htmlFor='name'  className='fs-5 labels '>Task Name</label>
             <input 
               type="text"
               id="name"
               className='form-control'
               placeholder='Name Of Todo'
               {...register("name",{required:true})}/>
          {errors.name?.type==="required"&&<p className="text-danger fw-bold fs-6">*Name is Required</p>}  
          </div>
            
            {/*Start Time*/}
          
          <div>
             <label htmlFor='Start-Time' className='fs-5 labels '>Start-Time</label>
             <select {...register("starttime",{required:true})}
              className="form-select" id="starttime" defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>Choose Start Time...</option>
                <option value="5 AM">5 AM</option>
                <option value="6 AM">6 AM</option>
                <option value="7 AM">7 AM</option>
                <option value="8 AM">8 AM</option>
                <option value="9 AM">9 AM</option>
                <option value="10 AM">10 AM</option>
                <option value="11 AM">11 AM</option>
                <option value="12 AM">12 AM</option>
                <option value="1 PM">1 PM</option>
                <option value="2 PM">2 PM</option>
                <option value="3 PM">3 PM</option>
                <option value="4 PM">4 PM</option>
                <option value="5 PM">5 PM</option>
                <option value="6 PM">6 PM</option>
                <option value="7 PM">7 PM</option>
                <option value="8 PM">8 PM</option>
                <option value="9 PM">9 PM</option>

             </select>
          {errors.starttime?.type==="required"&&<p className="text-danger fw-bold fs-6">*Start-timeis Required</p>}  
          </div>

            {/*END time*/}
          
          <div>
             <label htmlFor='END-Time' className='fs-5 labels' >END-Time</label>
             <select {...register("endtime",{required:true})}
              className="form-select" id="endtime" defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>Choose End Time...</option>
                <option value="5 AM">5 AM</option>
                <option value="6 AM">6 AM</option>
                <option value="7 AM">7 AM</option>
                <option value="8 AM">8 AM</option>
                <option value="9 AM">9 AM</option>
                <option value="10 AM">10 AM</option>
                <option value="11 AM">11 AM</option>
                <option value="12 AM">12 AM</option>
                <option value="1 PM">1 PM</option>
                <option value="2 PM">2 PM</option>
                <option value="3 PM">3 PM</option>
                <option value="4 PM">4 PM</option>
                <option value="5 PM">5 PM</option>
                <option value="6 PM">6 PM</option>
                <option value="7 PM">7 PM</option>
                <option value="8 PM">8 PM</option>
                <option value="9 PM">9 PM</option>

             </select>
          {errors.endtime?.type==="required"&&<p className="text-danger fw-bold fs-6">*End-Time is Required</p>}  
          </div>

           {/*Category*/}
           
          <div>
             <label htmlFor='Category' className='fs-5 labels '>Category</label>
             <select {...register("category",{required:true})}
              className="form-select" id="category" defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>Choose Category...</option>
                <option value="personal">Personal</option>
                <option value="fitness">Fitness</option>
                <option value="education">Education</option>
                <option value="generalknowledge">General-Knowledge</option>
                

             </select>
          {errors.category?.type==="required"&&<p className="text-danger fw-bold fs-6">*Category is Required</p>}  
          </div>
            
            {/*status*/}
            
          <div>
             <label htmlFor='Status' className='fs-5 labels '>Status</label>
             <select {...register("status",{required:true})}
              className="form-select" id="status" defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>Choose Status...</option>
                <option value="Finished">Finished</option>
                <option value="NotFinished">Not-Finished</option>
                <option value="InProgress">In-Progress</option>
                              

             </select>
          {errors.status?.type==="required"&&<p className="text-danger fw-bold fs-6">*Status is Required</p>}  
          </div>

         {/*day*/}

         
            
            {/*Submit Button*/}
          <div>
         
           <button type="submit"  className="text-center btn btn-dark rounded p-1.5 mt-4"><FaPlusCircle className="button-icon "/>Add Todo</button>
           <button type="submit" className="btn btn-danger mt-4" onClick={deleteEverything}>Clear List</button>
          </div>

        </div>

    </form>

    {/*modal for editing todo*/}

    <Modal show={show}
     onHide={closeModal}
     backdrop="static"
     centered
     className="modal">
      <Modal.Header>
        <Modal.Title>Edit Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={handleSubmit(addNewTodo)} >
        <div className="form  gap-5 m-5">

              {/*Name of Todo*/}

          <div >
             <label htmlFor='name'  className='fs-5 labels'>Task Name</label>
             <input 
               type="text"
               id="name"
               className='form-control'
               {...register("name",{required:true})}/>
        
          </div>
            
            {/*Start Time*/}
          
          <div>
             <label htmlFor='Start-Time' className='fs-5 labels'>Start-Time</label>
             <select {...register("starttime",{required:true})}
              className="form-select" id="starttime" defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>Choose Start Time...</option>
                <option value="5 AM">5 AM</option>
                <option value="6 AM">6 AM</option>
                <option value="7 AM">7 AM</option>
                <option value="8 AM">8 AM</option>
                <option value="9 AM">9 AM</option>
                <option value="10 AM">10 AM</option>
                <option value="11 AM">11 AM</option>
                <option value="12 AM">12 AM</option>
                <option value="1 PM">1 PM</option>
                <option value="2 PM">2 PM</option>
                <option value="3 PM">3 PM</option>
                <option value="4 PM">4 PM</option>
                <option value="5 PM">5 PM</option>
                <option value="6 PM">6 PM</option>
                <option value="7 PM">7 PM</option>
                <option value="8 PM">8 PM</option>
                <option value="9 PM">9 PM</option>

             </select>
             </div>

            {/*END time*/}
          
          <div>
             <label htmlFor='END-Time' className='fs-5 labels' >END-Time</label>
             <select {...register("endtime",{required:true})}
              className="form-select" id="endtime" defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>Choose End Time...</option>
                <option value="DEFAULT" disabled>Choose Start Time...</option>
                <option value="6 AM">6 AM</option>
                <option value="7 AM">7 AM</option>
                <option value="8 AM">8 AM</option>
                <option value="9 AM">9 AM</option>
                <option value="10 AM">10 AM</option>
                <option value="11 AM">11 AM</option>
                <option value="12 AM">12 AM</option>
                <option value="1 PM">1 PM</option>
                <option value="2 PM">2 PM</option>
                <option value="3 PM">3 PM</option>
                <option value="4 PM">4 PM</option>
                <option value="5 PM">5 PM</option>
                <option value="6 PM">6 PM</option>
                <option value="7 PM">7 PM</option>
                <option value="8 PM">8 PM</option>
                <option value="9 PM">9 PM</option>

             </select>
       
          </div>

           {/*Category*/}
           
          <div>
             <label htmlFor='Category' className='fs-5 labels'>Category</label>
             <select {...register("category",{required:true})}
              className="form-select" id="category" defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>Choose Category...</option>
                <option value="personal">Personal</option>
                <option value="fitness">Fitness</option>
                <option value="education">Education</option>
                <option value="generalknowledge">General-Knowledge</option>
                
             </select>
       
          </div>
            
            {/*status*/}
            
          <div>
             <label htmlFor='Statues' className='fs-5 labels'>Status</label>
             <select {...register("status",{required:true})}
              className="form-select" id="status" defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>Choose Status...</option>
                <option value="Finished">Finished</option>
                <option value="NotFinished">Not-Finished</option>
                <option value="InProgress">In-Progress</option>
                              

             </select>
     
          </div>
            
           
        </div>

    </form>
    </Modal.Body>
      <Modal.Footer>
        <Button onClick={saveObj}>Save</Button>
      </Modal.Footer>
     </Modal>

    {/*displaying in the form of table*/}

     
      
      <table className="table mt-4">
        <thead>
          <tr>
          <th className='fs-5'>Name Of Todo</th>
          <th  className='fs-5'>Start-Time</th>
          <th  className='fs-5'>End-Time</th>
          <th  className='fs-5'>Category</th>
          <th  className='fs-5'>Status</th>
          <th  className='fs-5'>Edit Button</th>
          <th  className='fs-5'>Delete Button</th>
          </tr>
        </thead>
    
        <tbody>
         {todos.map((todoObj)=>
          <tr key={todoObj.id}>
             <td >
                 {todoObj.name}
             </td>
             <td >
                 {todoObj.starttime}
             </td>
             <td >
                 {todoObj.endtime}
             </td>
             <td >
                 {todoObj.category}
             </td>
             <td >
                 {todoObj.status}
             </td>
            
             <td >
                 <button className='btn btn-warning' onClick={()=>editObj(todoObj)}>Edit</button>
             </td>
             <td >
                 <button className='btn btn-danger' onClick={()=>deleteTodo(todoObj)}>Delete</button>
             </td>

         </tr>)
          }
        </tbody>
      </table>
      {todos.length===0 && <div><img src="https://png.pngtree.com/png-vector/20190628/ourlarge/pngtree-empty-box-icon-for-your-project-png-image_1521417.jpg" alt=" " width="150px" height="120px" className='d-block m-auto '></img><p className="display-4 text-center text-dark">Empty!!!!</p></div>}
       
</div>
  )
}

export default AddTodos
