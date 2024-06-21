import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS } from '../types/authType';
export const userRegister = (data) => {
    return async (dispatch) => {
        try {

            const response = await axios.post(import.meta.env.VITE_SERVER_URL + '/register', data);
            document.cookie = `authToken=${response.data.token}; path=/; expires=${new Date(Date.now() + import.meta.env.VITE_COOKIE_EXP * 24 * 60 * 60 * 1000).toUTCString()}; Secure; SameSite=Strict`;
            localStorage.setItem('authToken', response.data.token);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    successMessage: response.data.successMessage,
                    token: response.data.token
                }
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: REGISTER_FAIL,
                payload: {
                    error: error.response.data.error.errorMessage
                }
            })
        }
    }
}
export const userLogin = (data) => {
    return async (dispatch) => {
        console.log(data);
        try {
            const response = await axios.post(import.meta.env.VITE_SERVER_URL + '/login', data);
            document.cookie = `authToken=${response.data.token}; path=/; expires=${new Date(Date.now() + import.meta.env.VITE_COOKIE_EXP * 24 * 60 * 60 * 1000).toUTCString()}; Secure; SameSite=Strict`;
            localStorage.setItem('authToken', response.data.token);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    successMessage: response.data.successMessage,
                    token: response.data.token
                }
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: REGISTER_FAIL,
                payload: {
                    error: error.response.data.error.errorMessage
                }
            })
        }

    }
}