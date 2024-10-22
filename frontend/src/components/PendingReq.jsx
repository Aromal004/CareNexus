import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const RequestCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const DoctorInfo = styled.div`
  flex-grow: 1;
`;

const DoctorName = styled.p`
  margin: 0;
  font-weight: bold;
  color: #444;
`;

const ResponseButton = styled.button`
  padding: 10px 15px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0052a3;
  }
`;

const Message = styled.p`
  text-align: center;
  color: #666;
  margin-top: 20px;
`;

function AttendingRequests() {
  const [requests, setRequests] = useState([]); // Initialize with an empty array
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch pending requests
    axios.get('http://localhost:8000/attending/pending-requests/')
      .then(response => {
        setRequests(response.data.requests || []); // Safely handle undefined
      })
      .catch(error => console.log(error));
  }, []);

  const handleRespond = async (requestId, action) => {
    try {
      // Get the CSRF token from cookies
      const csrfToken = Cookies.get('csrftoken'); // Now Cookies is defined

      const response = await axios.post(`http://localhost:8000/attending/respond-request/${requestId}/`, 
        { action },
        {
          headers: {
            'X-CSRFToken': csrfToken, // Include CSRF token in the header
          }
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error response:', error.response); // Log the full error for debugging
      setMessage(error.response?.data?.message || 'Error processing request');
    }
  };

  return (
    <Container>
      <Title>Requests</Title>
      {requests && requests.length > 0 ? ( // Ensure requests exist and are not empty
        requests.map(request => (
          <RequestCard key={request.id}>
            <DoctorInfo>
              <DoctorName>Request from {request.doctor_name}</DoctorName>
            </DoctorInfo>
            <div>
              <ResponseButton onClick={() => handleRespond(request.id, 'accept')}>Accept</ResponseButton>
              <ResponseButton onClick={() => handleRespond(request.id, 'reject')}>Reject</ResponseButton>
            </div>
          </RequestCard>
        ))
      ) : (
        <Message>No pending requests</Message> // Display a fallback message when there are no requests
      )}
      {message && <Message>{message}</Message>}
    </Container>
  );
}

export default AttendingRequests;
