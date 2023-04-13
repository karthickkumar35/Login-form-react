import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react';
import { stateContext } from '../context/stateContext';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

let object = [
  {
    name:"karthick",
    password:"12345",
  },
  {
    name:"king",
    password:"12345",
  },
  {
    name:"priya",
    password:"54321",
  }
]
const Login = () => {
    const [inpName,setName]=useState('')
    const [inpDes,setDes]=useState('')
    const [formSub,setFormsub]=useState(false)
    const [found,setFound] = useState(false)

  //---------------useContext-----
  const {state,dispatch} = useContext(stateContext);
  console.log(state)

    const inputName=(e)=>{
        console.log("e",e.target.value)
        setName(e.target.value)
   }
   const inputDes=(e)=>{
       console.log("e",e.target.value)
       setDes(e.target.value)
  }
  let navigate=useNavigate();
    const sub=(e)=>{
        e.preventDefault();
        setFormsub('true')
          console.log(inpName,inpDes);
          let login =  object.find((e)=>e.name === inpName && e.password === inpDes);
          if(login){
            navigate("/Home");
            localStorage.setItem("isLoggedIn",JSON.stringify(true));
            dispatch({type:"LOGIN",payload:true});
           }
          else{
            setFound(true)
          }
    }
   /*------------m--ui----*/
   const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  return (
    <div className="login-bg background-images">
      <form onSubmit={sub}>
          <h2 className='login-head'>Login...</h2>
            <TextField style={{color:"#fff"}} className="input" value={inpName} onChange={inputName} id="outlined-basic" label="Username" variant="outlined" />  
            {inpName==="" && formSub && <div className='errorMsg'>The Name Is Required</div>}
            <FormControl style={{color:"#fff"}} className="input" type={"password"} value={inpDes} onChange={inputDes} sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
    
            {inpDes==="" && formSub &&<div className='errorMsg'>The password Is Required</div>}      
            <input className="input link" type={"submit"} value={"Login"}></input>
            {found && <div className='errorMsg'>Enter crt Name or password</div>}
            <p className="para">Create a account...?</p>
        </form>
    </div>
  )
}

export default Login
