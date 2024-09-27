import styled from "styled-components";
import InputField from "../components/InputField";
import Button from '../components/button';
import { FaUser, FaLock,FaPhone  } from "react-icons/fa6";

import { SiGmail } from "react-icons/si";

function Register() {
  return (
    <Container>
      <Content>
        <h1>Register</h1>
        <Group>
          <InputField icon={<FaUser fontSize="18px" />} type="text" placeholder="Name" />
          <InputField icon={<SiGmail fontSize="18px" />} type="email" placeholder="Email" />
          <InputField icon={<FaPhone  fontSize="18px" />} type="text" placeholder="Phone" />
          <InputField icon={<FaLock fontSize="18px" />} type="password" placeholder="Password" />
          <InputField icon={<FaLock fontSize="18px" />} type="password" placeholder="Confirm Password" />
        </Group>
        <ButtonWrapper>
          <Button purpose="Register" />
        </ButtonWrapper>
      </Content>
    </Container>
  );
}

export default Register;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: url(images/background.jpg) no-repeat;
  background-size: cover;
  background-position: center;
  align-items: center;
  justify-content: center;
  color: white;
  height: 100vh; 
  h1 {
    color: white;
    margin-bottom: 10px;
  }
`;
const Group=styled.div`
    transform: translateX(-15px);
`
const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%; /* Ensure the button spans the full width */
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  backdrop-filter: blur(8px);
  border-radius: 10px;
`;
