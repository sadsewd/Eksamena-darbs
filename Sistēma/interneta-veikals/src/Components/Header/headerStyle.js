import styled from "styled-components";
import { Link } from "react-router-dom";
import { borderRadius, orangeVar } from "../../GlobalCSSVariables";

export const Header = styled.header`
  background: #282828;
  width: 100vw;
  color: #c8c8c8;
  height: 6.5rem;
  display: flex;
  align-items: center;
  `

  export const HeaderButton = styled(Link)`
  color: #c8c8c8;
  transition: 0.5s;
  &:hover{
    box-shadow: 0px 5px ${orangeVar};
  }
  `

  export const ButtonContainer = styled.div`
  display: flex;
  width: 40vw;
  font-size: 1.2rem;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  `;

  export const SideFunctionsContainer = styled.div`
  width: 60vw;
  align-items: center;
  justify-content: center;
  `;

  export const LoginButton = styled(Link)`
  padding: .5rem 2rem;
  background: ${orangeVar};
  color: white;
  ${borderRadius}
  float: right;
  margin-right: 3rem;
  transition: 0.3s ease-in-out;

  &:hover{
    color: black;
    background: #ffca00;
  }
  `;

  export const StyledInput = styled.input`
  width: 50%;
  height: 2.5rem;
  ${borderRadius}
  padding: .5rem;
  color: white;
  background: #3b3b3b;
  border: none;
  &::placeholder{
    color: grey;
  }
  &:focus{
    outline: none;
  }
  `;

