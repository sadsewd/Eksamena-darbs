import styled from 'styled-components';
import Button from '@mui/material/Button';
import { borderRadius, orangeVar } from '../../../GlobalCSSVariables';
import TextField from '@mui/material/TextField';

export const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(45deg, #989898, #4c4c4c);
`;

export const Form = styled.form`
  display: flex;
  background: #282828;
  ${borderRadius};
  width: 40%;
  height: 50%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

export const SButton = styled(Button)`
  width: 35vw;
  height: 5vh;
`;

export const Input = styled(TextField)`
  width: 35vw;
`;

export const Text = styled.h2`
  color: ${orangeVar};
  text-align: center;
`;
