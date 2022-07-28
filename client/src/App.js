import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './App.css';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';



 
function App() {
  const dateToString = () => {
    var date = new Date(),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + (date.getDate())).slice(-2);
    return ([date.getFullYear(), mnth, day].join("-"));
  }
  


 const [getData ,setGetData] = useState();

 useEffect(()=>{
  const retriveData = async ()=>{
    const res = await axios.get("http://localhost:5000/")
    const resp = res.data;
    setGetData(resp);

  }
  retriveData();
 })


  const [currentDate ,setCurrentDate] = useState(dateToString());
  const [task,setTask] = useState({
    userName:"Admin",
    taskId:uuidv4(),
    taskName:"",
    status:false,
    assignDate:currentDate,
    dueDate:currentDate
  });

   
function updateTaskName(e){
  const newTaskName = e.target.value;
  setTask((prevValue) => {
    return{
      ...prevValue,
      taskName:newTaskName
    }
  })
}

const updateTask = async (e) => {
  e.preventDefault();
  if(task.taskName === ""){
    alert("please enter task! task should not empty")
  }else{
    if(task.dueDate === currentDate){
      alert("dueDate should not today! please select different date");
    }else{
      const response =  await axios.post('http://localhost:5000/addTask', task)
      const data = await response.data;
      if(data === true){
        setTask((prevValue)=> {
          return{
            ...prevValue,
            taskName : "",
            dueDate : currentDate
          }
        })

      }else{
        alert("error")
      }

    }
  }
}


function deleteTask(id){
  Swal.fire({
    title: 'Have you complete!',
    showCancelButton: true,
    confirmButtonText: 'completed',
    denyButtonText: `cancel`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Task completed', '', 'success')
      del();
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
  function del(){
    const deleteTask = axios.delete(`http://localhost:5000/delete/${id}`); 

  }
}

async function updateStatus(id , status){
  const currentStatus = (status !== 'true');
  const changeToComplete = await axios.patch(`http://localhost:5000/update/${id}/${currentStatus}`)
  const retriveData = async ()=>{
    const res = await axios.get("http://localhost:5000/")
    const resp = res.data;
    setGetData(resp);
  }
  retriveData();
}

function updateDate(e){
  const selectedDueDate = e.target.value;
  setTask((prevValue) => {
    return{
      ...prevValue,
      dueDate:selectedDueDate
    }
  });
}
  return (
    <div className="App">
     <h2>ToDo List </h2>
     <form  className='form'>
     <TextField  label="Enter a task" variant="outlined" type="text" name="task" value={task.taskName} onChange={updateTaskName}  />
        <TextField
            id="date"
            label="select Due Date"
            type="date"
            value={task.dueDate}
            inputProps={{ min: currentDate }}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={updateDate}
        />
        <Button variant="contained" size="large" color="success"  type='submit' onClick={updateTask}>Contained</Button>

     </form>

     <div className='display list'>
      <div className='incompletedList'>
        {getData  ? getData.map((e,index)=>(<div className='listStyle'>
          <p>{e.taskName}</p>
          <p> {e.dueDate}</p>
          <Button variant="contained" sx={{width:20,height:20,fontSize:10}} color="success" onClick={()=>deleteTask(e._id)}>complete</Button>
          </div>
          )):"no Data found"}</div>
      <div className='upcomingList'>
      </div>
      <div className='completedList'>
      </div>
     </div>
    </div>
  );
}

export default App;
