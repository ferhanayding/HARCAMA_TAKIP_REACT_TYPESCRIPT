import api from '../../utils/api';
import { UserDispatch, LoginForm, User } from './../../types/user';
// *****************************************************************************************************************
// *****************************************************************************************************************
export const login =  (creds : LoginForm) => async (dispatch : UserDispatch)=> {
    dispatch({type : "LOGIN_START"})
    try {
        const response = await api().post<User>("/users/login", creds)
        dispatch({ type : "LOGIN_SUCCESS", payload : response.data})
        localStorage.setItem("token",response.data.token)
    } catch (error) {
        dispatch({type : "LOGIN_ERROR"})
    }
}
// *****************************************************************************************************************
export const isLoggedIn = () => async (dispacth : UserDispatch) => {
    dispacth({
        type: "IS_LOGGED_IN_START"
    })
    try {
        const response = await api().post("/users/is_logged_in")
        dispacth({
            type: "IS_LOGGED_IN_SUCCESS" , payload : response.data
        })
    } catch (error) {
        dispacth({
            type : "IS_LOGGED_IN_ERROR"
        })
    }
}
// *****************************************************************************************************************
export const logout = () => (dispacth : UserDispatch) => {
    localStorage.removeItem("token")
    dispacth ({
        type : "LOGOUT"
    })
} 
// *****************************************************************************************************************
