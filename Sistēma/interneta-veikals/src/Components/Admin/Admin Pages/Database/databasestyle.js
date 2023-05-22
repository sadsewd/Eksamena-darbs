import styled from 'styled-components';
import { TextColor, borderRadius, headerGray } from '../../../../GlobalCSSVariables';
import { Select, TextField } from '@mui/material';

export const StyledTable = styled.table`
  width: 90%;
  justify-content: center;
  background: ${headerGray};
  color: ${TextColor};
  border: 1px solid white;
  border-radius: ${borderRadius};
  padding: 0.3rem 0;
`;

export const StyledTableContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;

export const KeysRow = styled.tr`
  color: lightblue;
`;

export const StyledContainer = styled.div`
  display: flex;
  width: 35%;
  margin: auto;
  padding-top: 12.5%;
`;

export const Input = styled(TextField)`
  && {
    width: 100%;
    & label.Mui-focused {
      color: white;
    }
    & label {
      color: white;
    }
    & .MuiOutlinedInput-root {
      & fieldset {
        border-color: white;
      }
      &:hover fieldset {
        border-color: white;
      }
      &.Mui-focused fieldset {
        border-color: white;
      }
      & input {
        color: white;
      }
    }
  }
`;

export const Cotainer = styled.div`
  font-size: 0.9rem;
  text-align: center;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
  background-color: ${headerGray};
  padding: 1.5rem;
  border-radius: ${borderRadius};
`;

export const StyledForm = styled.div`
  font-size: 0.9rem;
  text-align: center;
  display: flex;
  width: 35%;
  font-size: 1.2rem;
  height: 100%;
  flex-direction: column;
  gap: 0.5rem;
  color: white;
  margin: auto;
  margin-top: 10%;
  background-color: ${headerGray};
  padding: 1.5rem;
  border-radius: ${borderRadius};
`;
