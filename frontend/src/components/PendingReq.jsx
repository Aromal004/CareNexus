import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function AttendingRequests() {
  const [requests, setRequests] = useState([]); // Initialize with an empty array
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch pending requests
    axios.get('http://localhost:8000/attending/pending-requests/')
      .then(response => {
        setRequests(response.data.requests || []); // Safely handle undefined
      })
      .catch(error => console.log(error));
  }, []);

  const handleRespond = async (requestId, action) => {
    try {
      // Get the CSRF token from cookies
      const csrfToken = Cookies.get('csrftoken'); // Now Cookies is defined

      const response = await axios.post(`http://localhost:8000/attending/respond-request/${requestId}/`, 
        { action },
        {
          headers: {
            'X-CSRFToken': csrfToken, // Include CSRF token in the header
          }
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error response:', error.response); // Log the full error for debugging
      setMessage(error.response?.data?.message || 'Error processing request');
    }
  };

  return (
    <div>
      <h1>Requests</h1>
      {requests && requests.length > 0 ? ( // Ensure requests exist and are not empty
        requests.map(request => (
          <div key={request.id}>
            <p>Request from {request.doctor_name}</p>
            <button onClick={() => handleRespond(request.id, 'accept')}>Accept</button>
            <button onClick={() => handleRespond(request.id, 'reject')}>Reject</button>
          </div>
        ))
      ) : (
        <p>No pending requests</p> // Display a fallback message when there are no requests
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default AttendingRequests;

