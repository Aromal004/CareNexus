import styled from "styled-components";


function InputField({icon,type,placeholder}){

    return(

        <Input>
            <div className="icon">{icon}</div>
            <div className="textfield">
                <input type={type}  placeholder={placeholder} required/>
            </div>
            
        </Input>
    )
}

export default InputField

const Input=styled.div`
    display: flex;
    height: 50px;
    width: 350px;
    align-items: center;
    color: #d8d8d8;

    input{
        height: 30px;
        font-size: 16px;
        font-weight: 250;
        width: 300px;
        border-radius: 25px;
        padding: 5px 5px 5px 35px;
        border: 1px solid #727272;
        background-color: transparent;
        color: white;
        &::placeholder{
            text-align: center;
            color: white;
        }
    }
    .icon{
        transform: translateX(30px);
    }
`