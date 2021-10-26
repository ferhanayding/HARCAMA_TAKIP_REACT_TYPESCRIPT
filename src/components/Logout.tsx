import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { logout } from '../store/actions/userAction'
import { AppState } from '../store/reducers'

const Logout = () => {

    const dispatch = useDispatch()
    const { data } = useSelector((state : AppState) => state.user)
    useEffect(() => {
        dispatch(logout())
    }, [])
    if(!data.username) return <Redirect to = "/login" />
    return (
        <div>
            logging out....
        </div>
    )
}

export default Logout
