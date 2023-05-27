import { Input } from '@mui/material';
import styled from 'styled-components';

export const SInput = styled(Input)`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;
// Noņemts default counter
