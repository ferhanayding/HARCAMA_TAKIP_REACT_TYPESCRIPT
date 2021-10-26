import { Header } from 'antd/lib/layout/layout'
import React, { useEffect } from 'react'
import {Menu} from "antd"
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../store/reducers'
// import { isLoggedIn } from '../store/actions/userAction'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../store/actions/userAction'
const AppHeader = () => {

    const {data , loading }  = useSelector((state :AppState) => state.user)
    const dispatch = useDispatch()
    const { pathname } =  useLocation()
    useEffect(() => {
        dispatch(isLoggedIn())
    }, [])
    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]} defaultSelectedKeys={["1"]}>
       {data.username ? 
       <React.Fragment>
       <Menu.Item key="1"><Link to = "/categories" >Kategori</Link></Menu.Item>
       <Menu.Item key="2"><Link to = "/records">Harcama Kayıtları</Link></Menu.Item>
       <Menu.Item key="3"><Link to = "/logout">Çıkış</Link></Menu.Item>
       </React.Fragment> : 
       (
           loading ? null : <Menu.Item key="/login"><Link to = "/login">Giriş</Link></Menu.Item>

       )
    }
      </Menu>
    </Header>
    )
}

export default AppHeader
