import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #357abd;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  font-size: 14px;
  margin-top: 10px;
  color: ${props => props.isError ? '#dc3545' : '#28a745'};
`;

// Create axios instance with default config
const api = axios.create({
  baseURL: '',
  withCredentials: true,  // Important for CSRF and session cookies
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

function AttendingReqDoc() {
  const [patientEmail, setPatientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [requestId, setRequestId] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Initialize CSRF protection
  useEffect(() => {
    const initializeCSRF = async () => {
      try {
        // First make a GET request to get the CSRF cookie
        await api.get('/get-csrf-token/');
        
        // Then get the token from cookies and set it in axios defaults
        const csrfToken = Cookies.get('csrftoken');
        if (csrfToken) {
          api.defaults.headers.common['X-CSRFToken'] = csrfToken;
        }
      } catch (error) {
        console.error('Error initializing CSRF:', error);
        setMessage('Error initializing security. Please refresh the page.');
      }
    };

    initializeCSRF();
  }, []);

  const handleSendRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        '/attending/send-request/', 
        { patient_email: patientEmail },
        {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
          }
        }
      );
      
      setMessage(response.data.message);
      setRequestId(response.data.request_id);
      setIsPolling(true);
      setPatientEmail('');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error sending request';
      setMessage(errorMsg);
      console.error('Request error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let interval;

    if (isPolling && requestId) {
      interval = setInterval(async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await api.get(
            `/attending/request-status/${requestId}/`,
            {
              headers: {
                'Authorization': token ? `Bearer ${token}` : '',
              }
            }
          );
          
          if (response.data.status === 'accepted') {
            setMessage('Request accepted. Redirecting to update stats...');
            setIsPolling(false);
            navigate(`/attending/update-stats/${requestId}`);
          }
        } catch (error) {
          setMessage('Error checking request status');
          console.error('Polling error:', error);
          setIsPolling(false); // Stop polling on error
        }
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPolling, requestId, navigate]);

  return (
    <Container>
      <Title>Send Request to Patient</Title>
      <Form onSubmit={handleSendRequest}>
        <Input
          type="email"
          value={patientEmail}
          onChange={(e) => setPatientEmail(e.target.value)}
          placeholder="Enter patient email"
          required
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !patientEmail}>
          {isLoading ? 'Sending...' : 'Send Request'}
        </Button>
        {message && (
          <Message isError={message.includes('Error')}>
            {message}
          </Message>
        )}
      </Form>
    </Container>
  );
}

export default AttendingReqDoc;