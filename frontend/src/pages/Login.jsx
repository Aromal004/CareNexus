
import { FaUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import Button from '../components/button';
import styled from "styled-components";
import InputField from "../components/InputField";
import React,{useState} from "react";
import { Link,redirect } from "react-router-dom";
import {connect, Provider} from "react-redux"
import { login } from "../actions/auth";

function Login({login}) {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const {email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit =e => { console.log("submit")
        e.preventDefault();
        console.log(formData)
        login(email,password)
    }
  return (
        <Container>
            <Content>
                <h1>Login</h1>
                <form action="" onSubmit={e => onSubmit(e)}>
                    <Group>                
                        <InputField n="email" icon={<FaUser fontSize="20px" />} type="email" placeholder="Enter Your Email" v={email} Change={onChange} required/>
                        <InputField n="password" icon={<FaLock fontSize="20px" />} type="password" placeholder="Password" v={password} Change={onChange} required />
                        <ResetPass>
                            <Link to="/reset-password">Forgot password</Link>
                            <a href="/register">Don't have an account?</a>
                        </ResetPass>                    
                    </Group>
                    <ButtonWrapper>
                        <Button purpose="Login" type="submit"/>
                    </ButtonWrapper>
                </form>
        </Content>
        </Container>
  )
}



export default  connect(null,{ login })(Login)


const Container = styled.div`
    
    display: flex;
    flex-direction: column;
    background: url(images/background_2.jpg) no-repeat;
    background-size: cover;
    background-position: center;
    align-items: center;
    justify-content: center;
    color: white;
    height: 100vh; 
    h1{
        color: white;
        margin-bottom: 10px;
    }
    
`;
const Group=styled.div`
    transform: translateX(-15px);
`
const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%; 
`;

const Content=styled.div`

    h1{
        transform: translateX(10px);
    }
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30px;
    backdrop-filter: blur(8px);
    border-radius: 10px;

`
const ResetPass=styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 18px;
    width: 100%;
    a{
        text-decoration: none;
        color: #ffffff;
        font-weight: 300;
        font-size: 13px;
        &:hover{
            color: #22a354;
        }
    }
`