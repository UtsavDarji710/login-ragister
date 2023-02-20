import { SIGN_UP, SIGN_IN ,GET_ALL_DATA,EDIT_PROFILE_DATA,CHANGE_PASSWORD,LOG_OUT} from "../Action/ActionConstant";

const initialState ={
    ragisterusers : [],
    loginuser : {},
    auth : null,
}

const Reducer = (state = initialState, action) => {
  switch(action.type){
    case GET_ALL_DATA:
        return {
          ...state,
            ragisterusers : [...action.payload.users],
            loginuser: {...action.payload.currUser},
            auth: action.payload.auth
        };
    
    case SIGN_UP:
        return {
         ...state,
         ragisterusers : [...action.payload.users],
         loginuser: {...action.payload.loginuser}
        };
    
    case SIGN_IN:
        return {
            ...state,
            loginuser: {...action.payload.loginuser},
            auth: action.payload.auth
        };
    case EDIT_PROFILE_DATA:
        return {
            ...state,
            ragisterusers : [...action.payload.users],
            loginuser: {...action.payload.currUser}
        }

    case CHANGE_PASSWORD:
        return {
            ...state,
            ragisterusers : [...action.payload.users],
            loginuser: {...action.payload.currUser}
        }

    case LOG_OUT:
        return{
            ...state,
            loginuser: {},
            auth: false
        }

    default:
        return state
  }
}

export default Reducer
