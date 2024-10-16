import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // useNavigate in v6

// Container for the landing page
const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
  padding: 0 20px;
`;

// Welcome message
const WelcomeMessage = styled.h1`
  font-size: 2.5rem;
  color: #007bff;
  margin-bottom: 20px;
  text-align: center;
`;

// Subtitle or instructions
const Instructions = styled.p`
  font-size: 1.2rem;
  color: #343a40;
  margin-bottom: 40px;
  text-align: center;
  max-width: 600px;
`;

// Button to proceed to another page
const ProceedButton = styled.button`
  padding: 12px 25px;
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #004085;
    transform: translateY(0);
  }
`;

function LandingPage() {
  const navigate = useNavigate(); // useNavigate replaces useHistory in v6

  // Handle button click to navigate to the next page (e.g., Dashboard)
  const handleProceed = () => {
    navigate("/dashboard"); // Adjust the path based on your routing setup
  };

  return (
    <LandingContainer>
      <WelcomeMessage>Welcome to CareNexus!</WelcomeMessage>
      <Instructions>
        You have successfully registered. Now you can explore the platform, manage your healthcare operations, book appointments, and much more.
      </Instructions>
      <ProceedButton onClick={handleProceed}>Go to Dashboard</ProceedButton>
    </LandingContainer>
  );
}

export default LandingPage;
