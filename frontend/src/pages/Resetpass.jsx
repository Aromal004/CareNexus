import { FaLock } from "react-icons/fa6";
import Button from '../components/button';
import styled from "styled-components";
import InputField from "../components/InputField";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth";

function ResetPass({ reset_password_confirm }) {
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: ''
  });

  const { new_password, re_new_password } = formData;
  const navigate = useNavigate();  
  const { uid, token } = useParams(); // Get uid and token from URL parameters

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (new_password === re_new_password) {
      const success = await reset_password_confirm(uid, token, new_password, re_new_password);
      if (success) {
        navigate('/');
      }
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <PageContainer>
      <Content>
        <h1>Reset Password</h1>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <InputField
              n="new_password"
              icon={<FaLock fontSize="20px" />}
              type="password"
              placeholder="New Password"
              v={new_password}
              Change={onChange}
              required
            />
            <InputField
              n="re_new_password"
              icon={<FaLock fontSize="20px" />}
              type="password"
              placeholder="Confirm Password"
              v={re_new_password}
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

export default connect(null, { reset_password_confirm })(ResetPass);

// Styled components

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url(images/background_2.jpg) no-repeat center center;
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

