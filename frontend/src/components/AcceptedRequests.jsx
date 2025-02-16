import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

const RequestsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RequestCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PatientInfo = styled.div`
  flex-grow: 1;
`;

const PatientName = styled.h3`
  margin: 0;
  color: #444;
`;

const RequestTime = styled.p`
  margin: 5px 0;
  color: #666;
  font-size: 14px;
`;

const UpdateButton = styled.button`
  padding: 8px 16px;
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

function AcceptedRequests() {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      try {
        setLoading(true);
        const response = await fetch('/attending/accepted-requests/', {
          credentials: 'include'
        });
        const data = await response.json();
        
        if (response.ok) {
          // Sort requests by request_time in descending order
          const sortedRequests = data.requests.sort((a, b) => new Date(b.request_time) - new Date(a.request_time));
          setAcceptedRequests(sortedRequests);
        } else {
          setMessage(data.message || 'Error fetching requests');
        }
      } catch (error) {
        setMessage('Error connecting to server');
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedRequests();
  }, []);

  const handleUpdateStats = (requestId) => {
    navigate(`/attending/update-stats/${requestId}`);
  };

  if (loading) {
    return <LoadingSpinner>Loading accepted requests...</LoadingSpinner>;
  }

  return (
    <Container>
      <Title>Accepted Requests</Title>
      {message && <Message>{message}</Message>}
      <RequestsList>
        {acceptedRequests.length > 0 ? (
          acceptedRequests.map((request) => (
            <RequestCard key={request.id}>
              <PatientInfo>
                <PatientName>{request.patient_name}</PatientName>
                <RequestTime>Requested on: {request.request_time}</RequestTime>
              </PatientInfo>
              <UpdateButton onClick={() => handleUpdateStats(request.id)}>
                Update Stats
              </UpdateButton>
            </RequestCard>
          ))
        ) : (
          <Message>No accepted requests found</Message>
        )}
      </RequestsList>
    </Container>
  );
}

export default AcceptedRequests;
