import React, { useState } from 'react';
import User_chk from '../components/user_chk';
import Patient from '../components/Patient';
import Doctor from '../components/Doctor';
import HospitalAdministration from '../components/HospitalAdministration';

// const Patient = () => (
//   <div>
//     <h2>Patient Component</h2>
//     <p>Patient-related information goes here.</p>
//   </div>
// );

// const Doctor = () => (
//   <div>
//     <h2>Doctor Component</h2>
//     <p>Doctor-related information goes here.</p>
//   </div>
// );

// const HospitalAdmin = () => (
//   <div>
//     <h2>Hospital Administration Component</h2>
//     <p>Hospital admin-related information goes here.</p>
//   </div>
// );

function SecondPage() {
  const [selectedRole, setSelectedRole] = useState(null); // Track selected role
  const [showOptions, setShowOptions] = useState(true); // Track whether to show User_chk

  // Function to render the component based on the selected role
  const renderComponent = () => {
    switch (selectedRole) {
      case 'Patient':
        return <Patient/>;
      case 'Doctor':
        return <Doctor />;
      case 'Hospital Administration':
        return <HospitalAdministration />;
      default:
        return null; // No role selected, return null
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
