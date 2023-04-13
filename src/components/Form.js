import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { stateContext } from '../context/stateContext'
import { keyboard } from '@testing-library/user-event/dist/keyboard'
import { Checkbox, TextField } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

localStorage.setItem('edit',JSON.stringify([]));
let tasks = [];
const Form = () => {

    // const [inpName,setName]=useState(JSON.parse(localStorage.getItem('edit'))?.length ?JSON.parse(localStorage.getItem('edit'))[0].Name:'')
    // const [inpDes,setDes]=useState(JSON.parse(localStorage.getItem('edit'))?.length ?JSON.parse(localStorage.getItem('edit'))[0].Description:'')
    // const [isCompleted,setIsCompleted]=useState('false')
    const {state,dispatch} = useContext(stateContext)
    console.log(state)
    tasks=state.forms;
    const [inpName,setName]=useState(state.edit?state.edit[0] ?.Name:'')
    const [inpDes,setDes]=useState(state.edit?state.edit[0]?.Description:'')
    const [isCompleted,setIsCompleted]=useState('false')
    const [formSub,setFormsub]=useState(false)
   // const [isAnswer,setAnswer]=useState(JSON.parse(localStorage.getItem("fromDetails")) || []);

    
  
 // let editItem = JSON.parse(localStorage.getItem('edit'))  
  let navigator = useNavigate()
    const inputName=(e)=>{
         console.log("e",e.target.value)
         setName(e.target.value)
    }
    const inputDes=(e)=>{
        console.log("e",e.target.value)
        setDes(e.target.value)
   }
    const checked=(e)=>{
        setIsCompleted(e.target.checked?"true":"false")
    }
    const sub=(e)=>{
        e.preventDefault();
        setFormsub('true')
          console.log(inpName,inpDes)
          const setof={Name:inpName, Description:inpDes, Answer:isCompleted}
          
        //   if(editItem?.length>0){
        //     console.log(isAnswer)
        //     isAnswer[editItem[1]]=setof;
        //     localStorage.removeItem('edit');
        //     localStorage.setItem('edit',JSON.stringify([]));
        //     localStorage.setItem("fromDetails",JSON.stringify([...isAnswer]))
        //   }
        //  else{ 
        //    setAnswer([...isAnswer,setof]);
        //    localStorage.setItem("fromDetails",JSON.stringify([...isAnswer,setof]))
        //  }


          if(state.edit?.length>0){
           tasks[state.edit[1]]=setof;
           dispatch({
            type:"EDIT",
            payload:[],
           }
            )
          }
         else{ 
           tasks.push(setof)
         }

       
        navigator("/Home")
    }
  return (
    <div className='form-bg background-images'>
        <form onSubmit={sub}>
        <h2 className='login-head'>Form...</h2>
            <TextField className="input" id="outlined-basic" label="Name" name='name' value={inpName} onChange={inputName} variant="outlined" />
            {inpName==="" && formSub && <div className='errorMsg'>The Name Is Required</div>}
            <TextField className="input" id="outlined-basic" label="Desription" name='des' value={inpDes} onChange={inputDes} variant="outlined" />   
            {inpDes==="" && formSub &&<div className='errorMsg'>The Des Is Required</div>}  
            <Checkbox value={isCompleted} onChange={checked} icon={<FavoriteBorder />} checkedIcon={<Favorite />} id="checkbox"/>      
            <label for='checkbox' className='para'>Its Completed</label>
            <input className="input link" type={"submit"} onClick={()=>dispatch({type:"ARRAY",payload:tasks})}></input>
        </form>
        <Link className="link" to={"/Home"}>Go To Home</Link>
    </div>
  )
}

export default Form