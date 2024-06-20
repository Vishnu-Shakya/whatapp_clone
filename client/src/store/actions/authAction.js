import axios from 'axios';
import { REGISTER_FAIL } from '../types/authType';
export const userRegister = (data) => {
    return async (dispatch) => {
        try {
            console.log(data);
            console.log(import.meta.env.VITE_SERVER_URL + '/register');
            const response = await axios.post(import.meta.env.VITE_SERVER_URL + '/register', data);
            console.log(response);
            document.cookie = `authToken=${response.data.token}; path=/; expires=${new Date(Date.now() + import.meta.env.VITE_COOKIE_EXP * 24 * 60 * 60 * 1000).toUTCString()}; Secure; SameSite=Strict`;
        } catch (error) {
            console.log(error);
            dispatch({
                type:REGISTER_FAIL,
                payload:{
                    error:error.response.data.error.errorMessage
                }
            })
        }
    }
}