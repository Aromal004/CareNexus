import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';
import styled from 'styled-components';

const Activate = ({ verify }) => {
    const [verified, setVerified] = useState(false);
    const navigate = useNavigate();
    const { uid, token } = useParams(); 

    const verify_account = async () => {
        const success = await verify(uid, token);
        if (success) {
            navigate('/');
        }
    };

    return (
        <Container>
            <Content>
                <h1>Verify your Account:</h1>
                <Button onClick={verify_account}>
                    Verify
                </Button>
            </Content>
        </Container>
    );
};

export default connect(null, { verify })(Activate);

// Styled Components
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 30px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    text-align: center;

    h1 {
        font-size: 24px;
        margin-bottom: 20px;
        color: white;
    }
`;

const Button = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
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
