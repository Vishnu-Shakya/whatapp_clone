import { CURRENT_FRIEND_SELECT, FRIEND_GET_FAIL, FRIEND_GET_SUCCESS } from "../types/messengerType";

const messengerState={
    currentFriend:"",
    status:0 // not active
    
}

export const currentFriendReducer=(state=messengerState,action)=>{
    const {payload,type}=action;

    if(type === CURRENT_FRIEND_SELECT){
        return {
            ...state,
            currentFriend:payload.currentFriend
        }
    }
    return state;
}