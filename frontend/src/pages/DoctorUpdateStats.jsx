import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  font-size: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 100px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.2);
  }
`;

const UpdateButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0052a3;
  }

  &:active {
    background-color: #004080;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  text-align: center;
  color: ${props => props.error ? '#dc3545' : '#666'};
  margin: 20px 0;
  font-size: 0.9rem;
`;

function DoctorUpdateStats() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [otherNotes, setOtherNotes] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set up axios defaults for CSRF
  useEffect(() => {
    // Function to get CSRF token from cookies
    const getCookie = (name) => {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    };

    // Set the CSRF token in axios defaults
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    // Also ensure we're sending cookies with requests
    axios.defaults.withCredentials = true;
  }, []);

  const handleUpdateStats = async () => {
    // Input validation
    if (!requestId) {
      setMessage('Request ID is not defined');
      return;
    }
    if (!bloodPressure) {
      setMessage('Blood Pressure is required');
      return;
    }
    if (!heartRate) {
      setMessage('Heart Rate is required');
      return;
    }
    if (isNaN(heartRate) || heartRate <= 0) {
      setMessage('Heart Rate must be a positive number');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`/attending/update-stats/${requestId}/`, {
        blood_pressure: bloodPressure,
        heart_rate: heartRate,
        other_notes: otherNotes,
      });
      alert(response.data.message);
      navigate('/doctor-dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating stats');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>Update Patient Stats</Title>
      
      <Input
        type="text"
        value={bloodPressure}
        onChange={(e) => setBloodPressure(e.target.value)}
        placeholder="Blood Pressure"
        disabled={isSubmitting}
      />
      
      <Input
        type="number"
        value={heartRate}
        onChange={(e) => setHeartRate(e.target.value)}
        placeholder="Heart Rate"
        disabled={isSubmitting}
      />
      
      <TextArea
        value={otherNotes}
        onChange={(e) => setOtherNotes(e.target.value)}
        placeholder="Other Notes"
        disabled={isSubmitting}
      />
      
      <UpdateButton 
        onClick={handleUpdateStats}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Updating...' : 'Update Stats'}
      </UpdateButton>
      
      {message && (
        <Message error={message.toLowerCase().includes('error')}>
          {message}
        </Message>
      )}
    </Container>
  );
}

export default DoctorUpdateStats;