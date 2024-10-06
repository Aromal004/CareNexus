import { FaUser, FaLock } from "react-icons/fa6";  
import Button from '../components/button';
import styled from "styled-components";
import InputField from "../components/InputField";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { connect } from "react-redux";
import { login } from "../actions/auth";

function Login({ login, isAuthenticated, error }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();  

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");  
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      setFormData({ email: "", password: "" });
    }
  }, [error]);

  return (
    <PageContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <LoginForm>
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <InputField
              n="email"
              icon={<FaUser fontSize="20px" />}
              type="email"
              placeholder="Enter Your Email"
              v={email}
              Change={onChange}
              required
            />
            <InputField
              n="password"
              icon={<FaLock fontSize="20px" />}
              type="password"
              placeholder="Password"
              v={password}
              Change={onChange}
              required
            />
            <Links>
              <Link to="/reset-password">Forgot password?</Link>
              <Link to="/register">Don't have an account?</Link>
            </Links>
          </FormGroup>
          <ButtonWrapper>
            <Button purpose="Login" type="submit" />
          </ButtonWrapper>
        </form>
      </LoginForm>
    </PageContainer>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error  
});

export default connect(mapStateToProps, { login })(Login);

// Styled components

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;

  h1 {
    margin-bottom: 20px;
    color: #333;
    font-size: 35px;
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
  width: 100%;
  
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  
  a {
    text-decoration: none;
    color: #333;
    font-size: 14px;
    transition: color 0.3s;

    &:hover {
      color: #22a354;
    }
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 16px;
  margin-bottom: 15px;
  text-align: center;
`;


