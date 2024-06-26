import { FRIEND_GET_FAIL, FRIEND_GET_SUCCESS } from "../types/messengerType";

const messengerState={
    friends:[]
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

    return state;
}