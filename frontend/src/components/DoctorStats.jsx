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

const DoctorStats = () => {
  const [doctorStats, setDoctorStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/attending/doctor-stats/', {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]')?.value
          }
        });
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setDoctorStats(data);
          setError(null);
        }
      } catch (err) {
        setError('An error occurred while fetching doctor stats');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorStats();
  }, []);

  if (loading) {
    return (
      <Loader>
        <p>Loading doctor stats...</p>
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
      {doctorStats && (
        <>
          <Heading>Doctor and Patient Statistics</Heading>
          <h2>Dr. {doctorStats.doctor_name} ({doctorStats.speciality} - {doctorStats.hospital})</h2>
          <Table>
            <thead>
              <tr>
                <TableHeader>Patient</TableHeader>
                <TableHeader>Age</TableHeader>
                <TableHeader>Condition</TableHeader>
                <TableHeader>Blood Pressure</TableHeader>
                <TableHeader>Heart Rate</TableHeader>
                <TableHeader>Notes</TableHeader>
              </tr>
            </thead>
            <tbody>
              {doctorStats.patients.map((patient, idx) => (
                <TableRow key={`${patient.patient_name}-${idx}`}>
                  <TableCell>{patient.patient_name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.medical_condition}</TableCell>
                  <TableCell>{patient.blood_pressure}</TableCell>
                  <TableCell>{patient.heart_rate} BPM</TableCell>
                  <TableCell>{patient.other_notes || '—'}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default DoctorStats;
