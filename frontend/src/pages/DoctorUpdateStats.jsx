import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import styled from 'styled-components'; // Import styled-components

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
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const UpdateButton = styled.button`
  padding: 10px 20px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0052a3;
  }
`;

const Message = styled.p`
  text-align: center;
  color: #666;
  margin: 20px 0;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  color: #666;
  margin: 20px 0;
`;

function DoctorUpdateStats() {
  // Get requestId from route parameters
  const { requestId } = useParams();  // Extract requestId from URL
  const navigate = useNavigate(); // Initialize useNavigate

  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [otherNotes, setOtherNotes] = useState('');
  const [message, setMessage] = useState('');

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

    try {
      const response = await axios.post(`http://localhost:8000/attending/update-stats/${requestId}/`, {
        blood_pressure: bloodPressure,
        heart_rate: heartRate,
        other_notes: otherNotes,
      });
      alert(response.data.message);

      // Navigate to the doctor dashboard after successful update
      navigate('/doctor-dashboard'); // Change this to the correct path for the dashboard
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating stats');
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
      />
      <Input
        type="number"
        value={heartRate}
        onChange={(e) => setHeartRate(e.target.value)}
        placeholder="Heart Rate"
      />
      <TextArea
        value={otherNotes}
        onChange={(e) => setOtherNotes(e.target.value)}
        placeholder="Other Notes"
      ></TextArea>
      <UpdateButton onClick={handleUpdateStats}>Update Stats</UpdateButton>
      {message && <Message>{message}</Message>}
    </Container>
  );
}

export default DoctorUpdateStats;
