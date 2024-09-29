import styled from "styled-components";
import { FaLock } from "react-icons/fa6";
import Button from "../components/button";
import InputField from "../components/InputField";

function ResetPass(){
    return(
        <Container>
            <Content>
                <h2>Reset Password</h2>
                <Group>
                    <InputField icon={<FaLock fontSize="20px" />} type="password" placeholder="Enter New Password" />
                    <InputField icon={<FaLock fontSize="20px" />} type="password" placeholder="Confirm Password" />
                </Group>
                <ButtonWrapper>
                    <Button purpose="Continue" />
                </ButtonWrapper>

        </Content>
    </Container>

    )

}
export default ResetPass


const Container = styled.div`
    
    display: flex;
    flex-direction: column;
    background: url(images/background_2.jpg) no-repeat;
    background-size: cover;
    background-position: center;
    align-items: center;
    justify-content: center;
    color: white;
    height: 100vh; 
    h2{
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
  width: 100%; 
`;

const Content=styled.div`

    h1{
        transform: translateX(10px);
    }
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30px;
    backdrop-filter: blur(8px);
    border-radius: 10px;

`
