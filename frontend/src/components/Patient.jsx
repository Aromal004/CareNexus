import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

const Patient = () => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [error, setError] = useState(null); // To handle any error from the backend
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false); // State to manage hover effect

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data to be sent to the backend
    const data = {
      age: parseInt(age, 10),
      height: parseFloat(height),
      weight: parseFloat(weight),
      medical_condition: medicalCondition,
    };

    try {
      // Retrieve CSRF token from cookies
      const csrfToken = Cookies.get('csrftoken'); // Get CSRF token from cookies

      // Make the POST request to Django backend
      console.log(localStorage.getItem('access'));
      const response = await axios.post('http://localhost:8000/user_info/Patient-Details/', data, {
        
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,  // Include JWT token for authentication
          'X-CSRFToken': csrfToken,  // Include CSRF token in the request
        }
      });

      // Handle successful response
      if (response.data.status === 'success') {
        alert('Patient info saved successfully!');
        navigate('/home');  // Redirect to home after successful form submission
      }
    } catch (error) {
      // Handle errors (e.g., network issues or backend validation errors)
      console.error('Error submitting patient info:', error);
      setError('Failed to save patient info. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Patient Information</h2>
      
      {/* Display error if there is one */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Medical Conditions:</label>
          <select
            value={medicalCondition}
            onChange={(e) => setMedicalCondition(e.target.value)}
            required
            style={styles.input}
          >
            <option value="">Select a condition</option>
            <option value="Arthritis">Arthritis</option>
            <option value="Liver Cirrhosis">Liver Cirrhosis</option>
            <option value="Cancer">Cancer</option>
            <option value="Dysmenorrhea">Dysmenorrhea</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Hypertension">Hypertension</option>
            <option value="Asthma">Asthma</option>
            <option value="Endometriosis">Endometriosis</option>
            <option value="Heart Disease">Heart Disease</option>
            <option value="Chronic Kidney Disease">Chronic Kidney Disease</option>
            <option value="Depression">Depression</option>
            <option value="COPD">COPD</option>
            <option value="HIV/AIDS">HIV/AIDS</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            ...styles.button,
            backgroundColor: isHovered ? '#0056b3' : '#007bff', // Change background color on hover
          }}
          onMouseEnter={() => setIsHovered(true)}  // Set hover state
          onMouseLeave={() => setIsHovered(false)} // Reset hover state
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Center vertically
    backgroundColor: '#f9f9f9',
    padding: '20px',
  },
  header: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#007bff',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '30px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '16px',
    fontWeight: '500',
  },
  input: {
    padding: '10px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    fontSize: '14px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%',
  },
};

export default Patient;
