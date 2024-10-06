import styled from "styled-components";

function InputField({ icon, type, placeholder, Change, n, v }) {
  return (
    <InputContainer>
      <div className="icon">{icon}</div>
      <input
        type={type}
        name={n}
        value={v}
        placeholder={placeholder}
        onChange={Change}
        required
      />
    </InputContainer>
  );
}

export default InputField;

// Styled component for the InputField
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 390px;
  margin-bottom: 15px;
  border-radius: 25px;
  padding: 5px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  
  .icon {
    margin-left: 15px;
    color: #555;
  }

  input {
    flex-grow: 1;
    height: 40px;
    border: none;
    padding: 0 15px;
    font-size: 16px;
    border-radius: 25px;
    outline: none;
    background: transparent;
    color: #333;

    &::placeholder {
      color: #999;
    }
  }

  &:focus-within {
    border-color: #22a354;
  }
`;




