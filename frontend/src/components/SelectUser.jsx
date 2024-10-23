import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SelectUser = () => {
    const navigate = useNavigate();
  const handleClick = (role) => {
    localStorage.setItem('role', role);
    console.log(`Selected role: ${role}`);
    navigate('/dashboard')
  };

  return (
    <BoxContainer>
      <Container>
        <h1>Select User</h1>
        <StyledButton onClick={() => handleClick('Patient')}>Patient</StyledButton>
        <StyledButton onClick={() => handleClick('Doctor')}>Doctor</StyledButton>
      </Container>
    </BoxContainer>
  );
};

// Styled-components for the box, container, and buttons
const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border: 2px solid #ddd;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const StyledButton = styled.button`
  padding: 15px 30px;
  margin: 10px 0;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  width: 80%;
  max-width: 300px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
  }
`;

export default SelectUser;
