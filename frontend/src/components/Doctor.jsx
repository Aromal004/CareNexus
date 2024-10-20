import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

const Doctor = () => {
  const [age, setAge] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [hospital, setHospital] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null); // To handle any error from the backend
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data to be sent to the backend
    const data = {
      age: parseInt(age, 10),
      speciality,
      hospital,
    };

    try {
      // Retrieve CSRF token from cookies
      const csrfToken = Cookies.get('csrftoken'); // Get CSRF token from cookies

      // Make the POST request to Django backend
      const response = await axios.post('http://localhost:8000/user_info/doctor-details/', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,  // Include JWT token for authentication
          'X-CSRFToken': csrfToken,  // Include CSRF token in the request
        }
      });

      // Handle successful response
      if (response.data.status === 'success') {
        alert('Doctor info saved successfully!');
        navigate('/Doctor-Dashboard');  // Redirect to home after successful form submission
      }
    } catch (error) {
      // Handle errors (e.g., network issues or backend validation errors)
      console.error('Error submitting doctor info:', error);
      setError('Failed to save doctor info. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Doctor Information</h2>
      
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
          <label style={styles.label}>Speciality:</label>
          <select
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            required
            style={styles.input}
          >
            <option value="">Select speciality</option>
            <option value="General Medicine">General Medicine</option>
            <option value="Oncologist">Oncologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatrist">Pediatrist</option>
            <option value="General Surgeon">General Surgeon</option>
            <option value="Cardiologist">Cardiologist</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Hospital:</label>
          <select
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
            required
            style={styles.input}
          >
            <option value="">Select hospital</option>
            <option value="MIMS">MIMS</option>
            <option value="Govt Medical College">Govt Medical College</option>
            <option value="Baby Memorial Hospital">Baby Memorial Hospital</option>
            <option value="Meditrina Hospital">Meditrina Hospital</option>
            <option value="PVS Hospital">PVS Hospital</option>
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

export default Doctor;
