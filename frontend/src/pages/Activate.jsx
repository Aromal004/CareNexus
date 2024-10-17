import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify, login } from '../actions/auth'; // Import login action
import styled from 'styled-components';

const Activate = ({ verify, login }) => {
    const navigate = useNavigate();
    const { uid, token } = useParams();
    const [isVerifying, setIsVerifying] = useState(false); // To handle UI state (optional)

    const verify_account = async () => {
        setIsVerifying(true);  // Optional, to show loading spinner
        const success = await verify(uid, token);
        if (success) {
            // Assuming you can get the user's email from the URL, a form, or store
            const email = localStorage.getItem('email');  // Assuming email is stored on signup

            if (email) {
                const password = localStorage.getItem('password');  // Assuming password stored on signup
                if (password) {
                    const loginSuccess = await login(email, password);
                    if (loginSuccess) {
                        navigate('/secondpage');
                    } else {
                        console.error("Auto login failed after verification");
                    }
                }
            }
        }
        setIsVerifying(false);  // Stop loading spinner
    };

    return (
        <PageContainer>
            <Content>
                <h1>Verify Your Account</h1>
                <Button onClick={verify_account} disabled={isVerifying}>
                    {isVerifying ? 'Verifying...' : 'Verify Account'}
                </Button>
            </Content>
        </PageContainer>
    );
};

export default connect(null, { verify, login })(Activate); // Include login in connect


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
