import { ERROR_MESSAGE_CLEAR, REGISTER_FAIL, REGISTER_SUCCESS, SUCCESS_MESSAGE_CLEAR } from "../types/authType";
import { jwtDecode } from "jwt-decode";
const authState={
    loading:true,
    authenticate:false,
    error:'',
    successMessage:'',
    myInfo:''
}

const decodeToken=token=>{
    const tokenDecoded=jwtDecode(token);
    const expTime=new Date(tokenDecoded.exp*1000);
    if(new Date() > expTime){
        return null;
    }
    else{
        return tokenDecoded;
    }
}

const getToken=localStorage.getItem('authToken');
if(getToken){
    const getInfo=decodeToken(getToken);
    if(getInfo){
        authState.myInfo=getInfo;
        authState.authenticate=true;
        authState.loading=false;
        authState.error="";

    }
}

export const authReducer=(state=authState,action)=>{
    const {payload,type}=action;

    if(type === REGISTER_FAIL){
        return {
            ... state,
            error:payload.error,
            authenticate:false,
            myInfo:'',
            loading:true
        }
    }

    if(type === REGISTER_SUCCESS){
        const myInfo=decodeToken(payload.token);
        return {
            ...state,
             error:'',
             authenticate:true,
             successMessage:payload.successMessage,
             error:'',
             loading:false,
             myInfo:myInfo

        }
    }
    if(type === SUCCESS_MESSAGE_CLEAR){
        
        return {
            ...state,
             successMessage:""
        }
    }
    if(type === ERROR_MESSAGE_CLEAR){
        
        return {
            ...state,
             error:""
        }
    }
    return state
}