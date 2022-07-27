import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './App.css';

 
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
     <form  >
        <input type="text" name="task" value={task.taskName} onChange={updateTaskName} placeholder="Enter a task"/>
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
        <button type='submit' onClick={updateTask}>+</button>
     </form>

     <div className='display list'>
      <div className='incompletedList'>
        {getData ? getData.map(e=>(<>
          <p>{e.taskName} | {e.dueDate}</p>
          </>
          )):"no Data found"}      </div>
      <div className='upcomingList'>
      </div>
      <div className='completedList'></div>
     </div>
    </div>
  );
}

export default App;
