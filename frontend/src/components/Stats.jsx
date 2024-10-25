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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  background-color: #f7fafc;
  border-bottom: 2px solid #e2e8f0;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9fafb;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.875rem;
`;

const NoteText = styled.p`
  color: #718096;
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
        
        // Sort stats by date descending (assuming date format is YYYY-MM-DD)
        const sortedStats = (data.stats || []).sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setStats(sortedStats);
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
        <Table>
          <thead>
            <tr>
              <TableHeader>Doctor</TableHeader>
              <TableHeader>Hospital</TableHeader>
              <TableHeader>Blood Pressure</TableHeader>
              <TableHeader>Heart Rate</TableHeader>
              <TableHeader>Notes</TableHeader>
              <TableHeader>Updated On</TableHeader>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, index) => (
              <TableRow key={`${stat.doctor_name}-${stat.date}-${index}`}>
                <TableCell>Dr. {stat.doctor_name}</TableCell>
                <TableCell>{stat.hospital}</TableCell>
                <TableCell>{stat.blood_pressure}</TableCell>
                <TableCell>{stat.heart_rate} BPM</TableCell>
                <TableCell>
                  {stat.other_notes ? <NoteText>{stat.other_notes}</NoteText> : '—'}
                </TableCell>
                <TableCell>{stat.date} at {stat.time}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default PatientStats;
