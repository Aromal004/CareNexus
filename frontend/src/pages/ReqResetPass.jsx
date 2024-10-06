import { FaUser } from "react-icons/fa6";  
import Button from '../components/button';
import styled from "styled-components";
import InputField from "../components/InputField";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { connect } from "react-redux";
import { reset_password } from "../actions/auth";

function ReqResetPass({ reset_password }) {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: ""
  });

  const { email } = formData;
  const navigate = useNavigate();  

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    reset_password(email);
    setRequestSent(true);
  };

  if (requestSent) {
    navigate('/');
  }

  return (
    <PageContainer>
      <Content>
        <h1>Request Password Reset</h1>
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
          </FormGroup>
          <ButtonWrapper>
            <Button type="submit" purpose="Reset Password" />
          </ButtonWrapper>
        </form>
      </Content>
    </PageContainer>
  );
}

export default connect(null, { reset_password })(ReqResetPass);

// Styled components

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-size: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;

  h1 {
    margin-bottom: 20px;
    color: #333;
    font-size: 24px;
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

