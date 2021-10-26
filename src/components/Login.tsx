import  { useEffect } from 'react'
import { Form, Input, Button,  Result } from 'antd';
import showError from '../utils/showError';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from '../types/user';
import { login } from '../store/actions/userAction';
import { AppState } from '../store/reducers';
import showSuccess from '../utils/showSuccess';

function Login() {
    const history = useHistory()
    const location = useLocation<{newSignUp?:boolean}>()
    const dispatch = useDispatch()
    const {data , error} = useSelector((state : AppState) => state.user )
    const onFinish =(values: LoginForm) => {
     dispatch(login(values))
       
    }
       useEffect(() =>{
           error && showError(error)
       },[error]) 

       useEffect(() => {
        data.username && showSuccess("you have successfuly logged in!")
       },[data.username])

       useEffect(()=>{
           const token = localStorage.getItem("token")
           if(token){
            history.push("/")
            // console.log(token)
           }
       },[data])
    return (
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
      >
        <h2 style={{ textAlign: "center", marginBottom: 40 }}>Please login</h2>
        
        {location.state?.newSignUp && (
             <Result
             status="success"
             title="You successfully signed up!"
             subTitle="Please login using your credentials."
           />
        ) }
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
}

export default Login
