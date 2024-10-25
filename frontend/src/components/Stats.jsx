import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Message = styled.p`
  text-align: center;
  color: #4a5568;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  color: #f56565;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StyledCard = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  background-color: #f7fafc;
`;

const DoctorName = styled.h2`
  font-size: 1.125rem;
  font-weight: bold;
  margin: 0;
`;

const Hospital = styled.p`
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const StatLabel = styled.span`
  font-weight: 500;
`;

const StatValue = styled.span`
  font-weight: normal;
`;

const Notes = styled.div`
  margin-top: 16px;
`;

const NoteLabel = styled.p`
  font-weight: 500;
`;

const NoteText = styled.p`
  color: #718096;
`;

const UpdateInfo = styled.div`
  font-size: 0.875rem;
  color: #718096;
  margin-top: 16px;
`;

const PatientStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/attending/patient-stats/', {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]')?.value
          }
        });
        const data = await response.json();
        setStats(data.stats || []);
        setError(null);
      } catch (err) {
        setError('An error occurred while fetching stats');
        setStats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Loader>
        <p>Loading stats...</p>
      </Loader>
    );
  }

  if (error) {
    return (
      <Loader>
        <ErrorMessage>Error: {error}</ErrorMessage>
      </Loader>
    );
  }

  return (
    <Container>
      <Heading>My Health Statistics</Heading>
      
      {!stats || stats.length === 0 ? (
        <Message>No statistics available yet.</Message>
      ) : (
        <Grid>
          {stats.map((stat, index) => (
            <StyledCard key={`${stat.doctor_name}-${stat.date}-${index}`}>
              <CardHeader>
                <DoctorName>Dr. {stat.doctor_name}</DoctorName>
                <Hospital>{stat.hospital}</Hospital>
              </CardHeader>
              <CardContent>
                <div>
                  <StatRow>
                    <StatLabel>Blood Pressure:</StatLabel>
                    <StatValue>{stat.blood_pressure}</StatValue>
                  </StatRow>
                  <StatRow>
                    <StatLabel>Heart Rate:</StatLabel>
                    <StatValue>{stat.heart_rate} BPM</StatValue>
                  </StatRow>
                  {stat.other_notes && (
                    <Notes>
                      <NoteLabel>Notes:</NoteLabel>
                      <NoteText>{stat.other_notes}</NoteText>
                    </Notes>
                  )}
                  <UpdateInfo>
                    Updated on {stat.date} at {stat.time}
                  </UpdateInfo>
                </div>
              </CardContent>
            </StyledCard>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default PatientStats;
