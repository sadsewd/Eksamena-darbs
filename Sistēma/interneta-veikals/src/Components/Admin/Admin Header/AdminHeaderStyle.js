import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Header = styled.header`
  background: #282828;
  width: 100vw;
  color: #c8c8c8;
  height: 6.5rem;
  display: flex;
  align-items: center;
`;

export const Button = styled(Link)``;

export const ButtonContainer = styled.div`
  margin-left: 5%;
  display: flex;
  font-size: 1.2rem;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  height: 100%;
`;
