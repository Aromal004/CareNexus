import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaChartBar, FaDownload, FaSignOutAlt } from 'react-icons/fa';
import { MdOutlinePendingActions } from "react-icons/md";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/auth';
import Profile from '../components/Profile';
import Stats from '../components/Stats';
import AttendingRequests from '../components/PendingReq';

const PatientDashboard = ({ logout }) => {
    const [activeComponent, setActiveComponent] = useState('stats');  // By default, Stats is active
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');  // Navigate to login page on logout
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'profile':
                return <Profile />;
            case 'Pending Request':
                return <AttendingRequests />;
            // case 'download':
            //     return <Download />;
            default:
                return <Stats />;
        }
    };

    return (
        <Container>
            <SidebarContainer>
                <SidebarMenu>
                    <MenuItem onClick={() => setActiveComponent('profile')}>
                        <FaUser /> Profile
                    </MenuItem>
                    <MenuItem onClick={() => setActiveComponent('stats')}>
                        <FaChartBar /> Stats
                    </MenuItem>
                    <MenuItem onClick={() => setActiveComponent('download')}>
                        <FaDownload /> Download
                    </MenuItem>
                    <MenuItem onClick={() => setActiveComponent('Pending Request')}>
                        <MdOutlinePendingActions /> Pending Requests
                    </MenuItem>
                </SidebarMenu>

                <LogoutButton onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                </LogoutButton>
            </SidebarContainer>

            <ContentContainer>
                {renderComponent()} {/* Renders the active component */}
            </ContentContainer>
        </Container>
    );
};

export default connect(null, { logout })(PatientDashboard);

const Container = styled.div`
    display: flex;
    height: 100vh;
`;

const SidebarContainer = styled.div`
    width: 250px;
    background-color: #5c6875; /* Using blue from other file */
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
`;

const SidebarMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const MenuItem = styled.div`
    font-size: 18px;
    display: flex;
    align-items: center;
    color: whitesmoke;
    cursor: pointer;
    padding: 10px;
    border-radius: 4px;
    transition: background 0.3s ease;

    svg {
        margin-right: 10px;
    }

    &:hover {
        background-color: #0056b3; /* Darker shade of blue for hover */
    }
`;

const LogoutButton = styled.button`
    background-color: #e74c3c; /* Keeping the red color for logout */
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 18px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 4px;
    margin-top: auto;

    svg {
        margin-right: 10px;
    }

    &:hover {
        background-color: #c0392b; /* Darker red on hover */
    }
`;

const ContentContainer = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #f8f9fa; /* Light background color for the main content area */
`;
