import React from 'react';
import * as S from './AdminHeaderStyle';

const AdminHeader = () => {
  return (
    <S.Header>
      <S.ButtonContainer>
        <S.Button to={'/admin/home'}>Pārskats</S.Button>
        <S.Button to={'/admin/database'}>Datubāze</S.Button>
        <S.Button>Izlogoties</S.Button>
      </S.ButtonContainer>
    </S.Header>
  );
};

export default AdminHeader;
