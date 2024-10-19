import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import styled from "styled-components";

// Main container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  transform: translateY(80px);
  align-items: center;
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 0 20px;
`;

// Hero Section styling
const HeroSection = styled.section`
  background-color: #e0f7fa;
  color: white;
  padding: 60px 20px;
  text-align: center;
  width: 100%;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
`;

const CTAButton = styled.button`
  padding: 12px 25px;
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

// Features Section styling
const FeaturesSection = styled.section`
  padding: 40px 20px;
  max-width: 1200px;
  width: 100%;
  text-align: center;
`;

const FeaturesTitle = styled.h2`
  font-size: 2.5rem;
  color: #343a40;
  margin-bottom: 40px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const FeatureCard = styled.div`
  background-color: white;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: 15px;
`;

const FeatureText = styled.p`
  font-size: 1rem;
  color: #6c757d;
`;

// Testimonial Section styling
const TestimonialSection = styled.section`
  padding: 40px 20px;
  background-color: #f1f1f1;
  width: 100%;
`;

const TestimonialTitle = styled.h2`
  font-size: 2.5rem;
  color: #343a40;
  margin-bottom: 30px;
  text-align: center;
`;

const TestimonialGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;

const TestimonialCard = styled.div`
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  max-width: 300px;
  text-align: center;
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  color: #6c757d;
`;

const Author = styled.h4`
  font-size: 1.2rem;
  color: #007bff;
  margin-top: 10px;
`;

// Footer styling
const Footer = styled.footer`
  background-color: #343a40;
  color: white;
  padding: 20px 0;
  width: 100%;
  text-align: center;
`;

const FooterText = styled.p`
  font-size: 1rem;
`;

const MainC=styled.div`
  display: flex;
  flex-direction: column;
`

function Home() {
  const navigate = useNavigate(); // useNavigate hook

  const handleGetStarted = () => {
    navigate("/login"); // Navigate to /login
  };

  return (
   <MainC>
    <Nav />
    <Container>
      {/* Hero Section */}
      <HeroSection id="home">
        <HeroTitle>Welcome to CareNexus</HeroTitle>
        <HeroSubtitle>Efficient, Connected, and Secure Healthcare Operations</HeroSubtitle>
        <CTAButton onClick={handleGetStarted}>Get Started</CTAButton>
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection id="about">
        <FeaturesTitle>Key Features</FeaturesTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureTitle>Appointment Scheduling</FeatureTitle>
            <FeatureText>
              Seamlessly book and manage appointments with healthcare professionals across
              multiple hospitals.
            </FeatureText>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Patient Management</FeatureTitle>
            <FeatureText>
              Track patient records, medical conditions, and history, all in one secure
              platform.
            </FeatureText>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Medicine Management</FeatureTitle>
            <FeatureText>
              Efficiently manage medication inventories and ensure timely prescription
              refills.
            </FeatureText>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      {/* Testimonials Section */}
      <TestimonialSection>
        <TestimonialTitle>What Our Users Say</TestimonialTitle>
        <TestimonialGrid>
          <TestimonialCard>
            <TestimonialText>
              "CareNexus has transformed how we manage patient care. It's so easy to use!"
            </TestimonialText>
            <Author>Dr. Sara Jayan</Author>
          </TestimonialCard>
          <TestimonialCard>
            <TestimonialText>
              "Scheduling appointments has never been simpler. Highly recommend it."
            </TestimonialText>
            <Author>George Paul</Author>
          </TestimonialCard>
        </TestimonialGrid>
      </TestimonialSection>

      {/* Footer */}
      <Footer id="footer">
        <FooterText>© 2024 CareNexus. All rights reserved.</FooterText>
      </Footer>
    </Container>
    </MainC>
  );
}

export default Home;
