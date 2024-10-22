// SentRequest.jsx (AttendingReqDoc)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Configure axios defaults for CSRF
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;  // Important for CSRF

function AttendingReqDoc() {
  const [patientEmail, setPatientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [requestId, setRequestId] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const navigate = useNavigate();

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        await axios.get('http://localhost:8000/get-csrf-token/');
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
    fetchCSRFToken();
  }, []);

  const handleSendRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/attending/send-request/', 
        { patient_email: patientEmail },
        {
          headers: {
            'Authorization': token ? `Bearer ${token}` : undefined,
          }
        }
      );
      
      setMessage(response.data.message);
      setRequestId(response.data.request_id);
      setIsPolling(true);
      setPatientEmail('');  // Clear the email field upon success
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error sending request');
      console.error('Request error:', error);
    }
  };

  useEffect(() => {
    let interval;

    if (isPolling && requestId) {
      interval = setInterval(async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(
            `http://localhost:8000/attending/request-status/${requestId}/`,
            {
              headers: {
                'Authorization': token ? `Bearer ${token}` : undefined
              }
            }
          );
          
          if (response.data.status === 'accepted') {
            setMessage('Request accepted. Redirecting to update stats...');
            setIsPolling(false);
            clearInterval(interval);
            navigate(`/attending/update-stats/${requestId}`);
          }
        } catch (error) {
          setMessage('Error checking request status');
          console.error('Polling error:', error);
        }
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isPolling, requestId, navigate]);

  return (
    <div>
      <h1>Send Request to Patient</h1>
      <div>
        <input
          type="email"
          value={patientEmail}
          onChange={(e) => setPatientEmail(e.target.value)}
          placeholder="Enter patient email"
        />
        <button onClick={handleSendRequest}>Send Request</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default AttendingReqDoc;
