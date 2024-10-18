import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Main container
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// Card for user information
const InfoCard = styled.div`
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 350px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  color: #007bff;
`;

// Grid for aligned text
// Grid for aligned text
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 150px auto;
  row-gap: 10px;
  column-gap: px;  // Reduced the column gap for a tighter layout
`;


const Label = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #060606;
`;

const Value = styled.p`
  font-size: 1.1rem;
  color: #050606;
`;

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/dashboard/')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch user information');
      })
      .then((data) => {
        if (data.status === 'success') {
          setUserInfo(data.data);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading user information...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      {userInfo ? (
        <InfoCard>
          {userInfo.user_type === 'patient' ? (
            <>
              <Title>Patient Dashboard</Title>
              <InfoGrid>
                <Label>Age:</Label>
                <Value>{userInfo.age}</Value>

                <Label>Height:</Label>
                <Value>{userInfo.height} cm</Value>

                <Label>Weight:</Label>
                <Value>{userInfo.weight} kg</Value>

                <Label>Medical Condition:</Label>
                <Value>{userInfo.medical_condition}</Value>
              </InfoGrid>
            </>
          ) : (
            <>
              <Title>Doctor Dashboard</Title>
              <InfoGrid>
                <Label>Age:</Label>
                <Value>{userInfo.age}</Value>

                <Label>Speciality:</Label>
                <Value>{userInfo.speciality}</Value>

                <Label>Hospital:</Label>
                <Value>{userInfo.hospital}</Value>
              </InfoGrid>
            </>
          )}
        </InfoCard>
      ) : (
        <p>No user information found.</p>
      )}
    </Container>
  );
};

export default Dashboard;
