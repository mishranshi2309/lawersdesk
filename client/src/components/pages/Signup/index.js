import React, {useEffect} from 'react'
import '../Login/index.css';
import {Link} from "react-router-dom";
import LoginImg from '../../assets/login.jpg';
import { Form, Input, Button, Divider  } from "antd";
import axios from 'axios';
import PORT from '../../ENV';
import {useNavigate} from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
    const onFinish = (values) => {
        console.log("Success:", values);
        axios.post(`http://localhost:${PORT}/signup`, values)
        .then(res=> {
          console.log(res);
          if(res.data.msg === 'successful'){
            navigate('/'  , { replace: true });
          }
        })
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };

      useEffect(() => {
        if(localStorage.getItem('affidUser') !== null) {
          navigate('/template', {replace: true})
        }
      }, [])
      return (
        <div className="bg-img ">
          <div className="d-flex shadow mb-5 bg-white rounded margin  center-div ">
            <div className="d-flex pad-0" style={{ height: "450px" }}>
              <div><img src={LoginImg} className="login-img" alt="loginimg"/></div>
              <div className="flex-row-reverse px-5 mt-5 form-div">
                <h4 className="text-center mb-4 text-primary">REGISTER</h4>
                <Form
                className="col-16"
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                   
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Username"/>
                  </Form.Item>
    
                  <Form.Item
                    
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password"/>
                  </Form.Item>
    
                  <Form.Item
                    
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email id!",
                      },
                    ]}
                  >
                    <Input placeholder="Email Id"/>
                  </Form.Item>
                  <Form.Item
                   
                  >
                    <Button type="primary" htmlType="submit" className="submit-btn" >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
                
                <Divider>OR</Divider>
    
                <Button type="primary" htmlType="submit" className="submit-btn bg-success" >
                <Link to="/">Login</Link>
              </Button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Signup
