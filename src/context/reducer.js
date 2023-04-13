export const initialState = {
    isLoggedIn:JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    forms:[],
    edit:[],
}

export const stateReducer = (state,action)=>{
    console.log(state);
    switch(action.type){
        case "LOGIN":return{
            ...state,
            isLoggedIn:action.payload,
        }
        case "ARRAY":return{
            ...state,
            forms:action.payload,
        }
        case "EDIT":return{
            ...state,
            edit:action.payload,
        }
        default:return state;
    }
}