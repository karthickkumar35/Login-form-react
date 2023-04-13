import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Icon } from '@iconify/react';
import { stateContext } from '../context/stateContext';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

//-------------icons------------
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';


const Home = () => {
    // const getValue =JSON.parse(localStorage.getItem("fromDetails"));
    // const [rate,setRate]=useState(getValue)
    // const [item,setItems] = useState('[]')

    const {state:{forms},dispatch} = useContext(stateContext)
    console.log(forms)
    // const context = useContext(stateContext);  
    // let karthick = context.state.forms;  

    let deleted = (value)=>{
      let newTask = [...forms];
      newTask.splice(value,1);
      dispatch({
        type:"ARRAY",
        payload:newTask,
      })
      // delete getValue[e];
      // let get = getValue.flat();
      // localStorage.removeItem("fromDetails");
      // localStorage.setItem("fromDetails",JSON.stringify(get));
      // setRate(get);
    }
    let navigator = useNavigate();
    let edit = (value,index)=>{
        navigator("/Form");
        dispatch({
          type:"EDIT",
          payload:[value,index]
        })
        // let edited = [getValue[e],e];
        // localStorage.setItem("edit",JSON.stringify(edited))
    }
    let form = ()=>{
      navigator("/Form");
    }
    const actions = [
      { icon: <FileCopyIcon onClick={()=>form()} />, name: 'form'},
      { icon: <SaveIcon />, name: 'Save' },
      { icon: <PrintIcon />, name: 'Print' },
      { icon: <ShareIcon />, name: 'Share' },
    ];
  return (
    <div className='full'>
        <Link className="link" to={"/Form"}>Go To Form</Link>
        <div>
            {forms.map((value,index)=>{
              return  <div className='outputBox' key={index}>
                <h2 className='content'>Name : {value.Name}</h2>
                <h3 className='content'>Description : {value.Description}</h3>
                <h4 className='content'>checked : {value.Answer}</h4>
                <div className='icon-Group'>
                <Icon className="icons" onClick={()=>deleted(index)} icon="ic:baseline-delete" />
                <Icon className="icons" onClick={()=>edit(value,index)} icon="material-symbols:edit-square-outline-rounded" />
                </div>
                </div>
            })
            }
        </div>
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        </Box>    
    </div>
  )
}

export default Home
