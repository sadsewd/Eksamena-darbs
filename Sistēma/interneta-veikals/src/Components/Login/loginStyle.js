import styled from "styled-components";
import Button from '@mui/material/Button';
import { borderRadius, orangeVar } from "../../GlobalCSSVariables";
import TextField from '@mui/material/TextField';
import loginBG from '../../Assets/loginBG.jpg'

export const LoginContainer = styled.div`
  width:100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${loginBG});
  `

  export const Form = styled.form`
    display: flex;
    background: #282828;
    ${borderRadius};
    width: 40%;
    height: 50%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 30px 0px;
  `;

  //MUI komponentēm ir nepieciešam palielināt specificitāti, to var izdarīt atkārtotojot klasi lietotjot &&{}

  export const SButton = styled(Button)`
  &&{
    border-color: ${orangeVar};
    color: ${orangeVar};
    width: 80%;
    height: 5vh;
    &:hover{
      border-color: ${orangeVar};
    }
  }
  `;

  export const Text = styled(TextField)`
  &&{
  width: 80%;
  height: 5vh;
  & label.Mui-focused {
    color: ${orangeVar};
  }
  & label{
    color: ${orangeVar};
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${orangeVar};
    }
    &:hover fieldset {
      border-color: ${orangeVar};
    }
    &.Mui-focused fieldset {
      border-color: ${orangeVar};
    }
    & Input{
      color: ${orangeVar};
     }
  }
}
`;
