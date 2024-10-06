import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';
import styled from 'styled-components';

const Activate = ({ verify }) => {
    const navigate = useNavigate();
    const { uid, token } = useParams(); 

    const verify_account = async () => {
        const success = await verify(uid, token);
        if (success) {
            navigate('/');
        }
    };

    return (
        <PageContainer>
            <Content>
                <h1>Verify Your Account</h1>
                <Button onClick={verify_account}>
                    Verify Account
                </Button>
            </Content>
        </PageContainer>
    );
};

export default connect(null, { verify })(Activate);

// Styled Components

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
  text-align: center;

  h1 {
    margin-bottom: 20px;
    color: #333;
    font-size: 24px;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 30px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
