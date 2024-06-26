
import axios from 'axios'
import { FRIEND_GET_FAIL, FRIEND_GET_SUCCESS } from '../types/messengerType';
export const getFriends = () => async (dispatch) => {

    try {
        console.log(import.meta.env.VITE_SERVER_URL + '/get-friends')
        const response = await axios.get(import.meta.env.VITE_SERVER_URL + '/get-friends', {
            withCredentials: true
        });
        console.log(response.data.friends)
        dispatch({
            type: FRIEND_GET_SUCCESS,
            payload: {
                friends: response.data.friends
            }
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: FRIEND_GET_FAIL,
            payload: {
                error: error.response.data.error.errorMessage
            }
        })
    }
}
export const messageSend = (data) => async (dispatch) => {
    try {
        const response = await axios.post(import.meta.env.VITE_SERVER_URL + '/send-message', data);
        console.log(response);
    } catch (error) {
        console.log(error.response.data);
    }
}

export const getMessage = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(import.meta.env.VITE_SERVER_URL + '/get-message',data);
            console.log(response)

        } catch (error) {
            console.log("err",error);
        }
    }
}