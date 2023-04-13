import React, { useReducer } from 'react'
import { BrowserRouter, Navigate, Route ,Routes} from 'react-router-dom'
import Login from './login';
import Home from './Home'
import Form from './Form'
import { stateContext } from '../context/stateContext';
import { initialState, stateReducer } from '../context/reducer';

const Routing = () => {
  const [state,dispatch] = useReducer(stateReducer,initialState);
  return (
    <div>
      <stateContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
      {state?.isLoggedIn?(
          <Routes>
          <Route path="*" element={<Navigate to={"/Home"}></Navigate>}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Form" element={<Form />}></Route>
      </Routes>
      ):(
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="*" element={<Navigate to={"/"}></Navigate>}></Route>
        </Routes>
      )}
        
      </BrowserRouter>
      </stateContext.Provider>
    </div>
  )
}

export default Routing
