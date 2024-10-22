import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components';

// Configure axios defaults for CSRF
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;  // Important for CSRF

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  max-width: 400px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0052a3;
  }
`;

const Message = styled.p`
  text-align: center;
  color: ${props => (props.error ? 'red' : '#666')};
  margin-top: 20px;
`;

function AttendingReqDoc() {
  const [patientEmail, setPatientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [requestId, setRequestId] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const navigate = useNavigate();

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        await axios.get('http://localhost:8000/get-csrf-token/');
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
    fetchCSRFToken();
  }, []);

  const handleSendRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/attending/send-request/',
        { patient_email: patientEmail },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );

      setMessage(response.data.message);
      setRequestId(response.data.request_id);
      setIsPolling(true);
      setPatientEmail(''); // Clear the email field upon success
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error sending request');
      console.error('Request error:', error);
    }
  };

  useEffect(() => {
    let interval;

    if (isPolling && requestId) {
      interval = setInterval(async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(
            `http://localhost:8000/attending/request-status/${requestId}/`,
            {
              headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
              },
            }
          );

          if (response.data.status === 'accepted') {
            setMessage('Request accepted. Redirecting to update stats...');
            setIsPolling(false);
            clearInterval(interval);
            navigate(`/attending/update-stats/${requestId}`);
          }
        } catch (error) {
          setMessage('Error checking request status');
          console.error('Polling error:', error);
        }
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isPolling, requestId, navigate]);

  return (
    <Container>
      <Title>Send Request to Patient</Title>
      <InputWrapper>
        <Input
          type="email"
          value={patientEmail}
          onChange={(e) => setPatientEmail(e.target.value)}
          placeholder="Enter patient email"
        />
        <Button onClick={handleSendRequest}>Send Request</Button>
      </InputWrapper>
      {message && <Message error={message.includes('Error')}>{message}</Message>}
    </Container>
  );
}

export default AttendingReqDoc;
