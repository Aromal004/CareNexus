import styled from "styled-components";


function Button({purpose,type}){
    return (
        <Buton>
            <button type={type}>{purpose}</button>
        </Buton>
    )
}

export default Button

const Buton=styled.div`
    button{
        font-size: 17px;
        font-weight: 550;
        width: 280px;
        border-radius: 25px;
        margin-right: 10px;
        padding: 10px;
        border: 1px solid #4c4b4b;
        background-color: #40b840;
        border: none;
        transition: background-color  0.3s ease, color 0.3s ease;
        &:hover{
            color: white;
            background-color: #58cf58;
        }
    }
`