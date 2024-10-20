// DoctorUpdateStats.js
import React, { useState } from 'react';
import axios from 'axios';

function DoctorUpdateStats({ requestId }) {
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [otherNotes, setOtherNotes] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdateStats = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/attending/update-stats/${requestId}/`, {
        blood_pressure: bloodPressure,
        heart_rate: heartRate,
        other_notes: otherNotes,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'Error updating stats');
    }
  };

  return (
    <div>
      <h1>Update Patient Stats</h1>
      <input
        type="text"
        value={bloodPressure}
        onChange={(e) => setBloodPressure(e.target.value)}
        placeholder="Blood Pressure"
      />
      <input
        type="number"
        value={heartRate}
        onChange={(e) => setHeartRate(e.target.value)}
        placeholder="Heart Rate"
      />
      <textarea
        value={otherNotes}
        onChange={(e) => setOtherNotes(e.target.value)}
        placeholder="Other Notes"
      ></textarea>
      <button onClick={handleUpdateStats}>Update Stats</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DoctorUpdateStats;
