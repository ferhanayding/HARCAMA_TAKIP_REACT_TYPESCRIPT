import { UserState, UserAction, User } from './../../types/user';

const defaultState : UserState={
    data : {} as User,
    loading : false,
    error : ""
}
// defaultstate olarak baslıngıc state i tanımladık ve type olarak userstate dedik ve onuda herzamanki gibi state e atadık 
const userReducer = (state : UserState = defaultState, action : UserAction ) =>{
    switch (action.type) {

        case "LOGIN_START":
        case "IS_LOGGED_IN_START":
            return {...state, loading : true, error : ""}

            case "LOGIN_SUCCESS":
                case "IS_LOGGED_IN_SUCCESS":
                return {...state, loading : false , data : action.payload}
                
                case "LOGIN_ERROR":
                    return {...state , loading : false , error : "login failed"}
                    case "IS_LOGGED_IN_ERROR" : 
                    return {
                        ...state  ,loading : false , error : "token missing or invalid"
                    }
                    // *****************************************************************************************************************

                    case "LOGOUT":
                        return {
                            ...state , data : {} as User
                        }
                        // *****************************************************************************************************************
        default:
            return state
    }

}
export default userReducer;