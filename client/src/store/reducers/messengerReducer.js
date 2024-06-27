import { FRIEND_GET_FAIL, FRIEND_GET_SUCCESS, MESSAGE_GET_SUCCESS,MESSAGE_ALL_GET_SUCCESS, MESSAGE_SEND_SUCCESS } from "../types/messengerType";

const messengerState={
    friends:[],
    messages:[],
    lastMessage:[]
}


export const messengerReducer=(state=messengerState,action)=>{
    const {payload,type}=action;

    if(type === FRIEND_GET_SUCCESS){
        return {
            ...state,
            friends:payload.friends
        }
    }
    if(type === FRIEND_GET_FAIL){
        return {
            ...state,
        }
    }
    if(type===MESSAGE_GET_SUCCESS){
        console.log(payload)
        return {
            ...state,
            messages:payload.messages
        }
    }
    if(type===MESSAGE_ALL_GET_SUCCESS){

        return {
            ...state,
            lastMessage:payload.messages
        }
    }
    if(type===MESSAGE_SEND_SUCCESS){
        return {
            ...state,
            messages:[...state.messages,payload.message] 
        }
    }
    if(type==='SOCKET_MESSAGE'){
        return {
            ...state,
            messages:[...state.messages,payload] 
        }
    }
    return state;
}