import React from 'react';
import * as S from './AdminHeaderStyle';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <S.Header>
      <S.ButtonContainer>
        <S.Button>Pārskats</S.Button>
        <S.Button>Datubāze</S.Button>
        <S.Button>Izlogoties</S.Button>
      </S.ButtonContainer>
    </S.Header>
  );
};

export default AdminHeader;
