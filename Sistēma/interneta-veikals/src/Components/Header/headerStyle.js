import styled from "styled-components";
import { Link } from "react-router-dom";
import { borderRadius, darkBlue } from "../../GlobalCSSVariables";

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
    box-shadow: 0px 5px ${darkBlue};
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
  background: ${darkBlue};
  ${borderRadius}
  float: right;
  margin-right: 3rem;
  `;

  export const StyledInput = styled.input`
  width: 50%;
  height: 2.5rem;
  ${borderRadius}
  color: black;
  &::placeholder{
    color: grey;
  }
  `;

