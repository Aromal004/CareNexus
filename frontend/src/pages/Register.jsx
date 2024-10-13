import React, { useState } from "react";
import styled from "styled-components";
import InputField from "../components/InputField";
import Button from '../components/button';
import { FaUser, FaLock, FaPhone } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import { useNavigate } from "react-router-dom";

function Register({ signup }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    re_password: "" 
  });

  const { name, email, phone, password, re_password } = formData;
  const navigate = useNavigate();  

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (password === re_password) {
        const register = await signup(name, email, phone, password, re_password);
        
        if (register && register.status === 201) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            navigate("/");
        } else if (register && register.status === 400) {
            const errorData = register.data;
            if (errorData.email) {
                alert(`Email error: ${errorData.email[0]}`);
                setFormData({ ...formData, email: "" });
            } else if (errorData.password) {
                alert(`Password error: ${errorData.password[0]}`);
                setFormData({ ...formData, re_password: "", password: "" });
            } else {
                alert("An error occurred during registration. Please try again.");
            }
        } else {
            alert("Something went wrong. Please try again.");
        }
    } else {
        alert("Passwords do not match!");
        setFormData({ ...formData, re_password: "", password: "" });
    }
  };

  return (
    <PageContainer>
      <Content>
        <h1>Sign Up</h1>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <InputField 
              icon={<FaUser fontSize="18px" />} 
              type="text" 
              placeholder="Name" 
              n="name" 
              v={name} 
              Change={onChange} 
              required 
            />
            <InputField 
              icon={<SiGmail fontSize="18px" />} 
              type="email" 
              placeholder="Email" 
              n="email" 
              v={email} 
              Change={onChange} 
              required 
            />
            <InputField 
              icon={<FaPhone fontSize="18px" />} 
              type="text" 
              placeholder="Phone" 
              n="phone" 
              v={phone} 
              Change={onChange} 
              required 
            />
            <InputField 
              icon={<FaLock fontSize="18px" />} 
              type="password" 
              placeholder="Password" 
              n="password" 
              v={password} 
              Change={onChange} 
              required 
            />
            <InputField 
              icon={<FaLock fontSize="18px" />} 
              type="password" 
              placeholder="Confirm Password" 
              n="re_password" 
              v={re_password} 
              Change={onChange} 
              required 
            />
          </FormGroup>
          <ButtonWrapper>
            <Button purpose="Register" type="submit" />
          </ButtonWrapper>
        </form>
      </Content>
    </PageContainer>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error  
});

export default connect(mapStateToProps, { signup })(Register);

// Styled components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  /* background: url(images/background_2.jpg) no-repeat center center; */
  background-size: cover;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 40px;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;

  h1 {
    margin-bottom: 20px;
    color: #333;
    font-size: 35px;
    text-align: center;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

