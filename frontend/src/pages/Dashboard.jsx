import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Dashboard() {
  const [role, setRole] = useState(null);  
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const normalizedRole = storedRole?.toLowerCase();
    setRole(normalizedRole);

    // Automatically navigate based on role
    if (normalizedRole === 'patient') {
      navigate('/patient-dashboard'); // Navigate to patient dashboard
    } else if (normalizedRole === 'doctor') {
      navigate('/doctor-dashboard'); // Navigate to doctor dashboard
    }
  }, [navigate]);

  return (
    <div>
      {!role && <p>Loading...</p>} 
    </div>
  );
}

export default Dashboard;

