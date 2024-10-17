import React, { useState } from 'react';
import User_chk from '../components/user_chk';
import { useNavigate } from 'react-router-dom';


function SecondPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null); // Track selected role
  const [showOptions, setShowOptions] = useState(true); // Track whether to show User_chk

  // Function to render the component based on the selected role
  const renderComponent = () => {
    switch (selectedRole) {
      case 'Patient':
        navigate('/user_info/Patient-Details');
        break;
      case 'Doctor':
        navigate('/user_info/Doctor-Details');
        break;
      case 'Hospital Administration':
        navigate('/user_info/HospitalAdmin-Details');
        break;
      default:
        break; // Do nothing if no role is selected
    }
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role); // Set selected role
    setShowOptions(false); // Hide the User_chk component after selection
  };

  return (
    <div>
      {/* Conditionally render the User_chk component */}
      {showOptions && <User_chk onSelectRole={handleRoleSelection} />}

      {/* Render the corresponding component based on the selected role */}
      <div className="role-details">
        {renderComponent()}
      </div>
    </div>
  );
}

export default SecondPage;
