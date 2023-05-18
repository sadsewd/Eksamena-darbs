import React from 'react';
import * as S from './AdminHeaderStyle';
import { useSignOut } from 'react-auth-kit';

const AdminHeader = () => {
  const signOut = useSignOut();

  return (
    <S.Header>
      <S.ButtonContainer>
        <S.Button to={'/admin/home'}>Pārskats</S.Button>
        <S.Button to={'/admin/database'}>Datubāze</S.Button>
        <S.Button onClick={signOut} to={'/admin'}>
          Izlogoties
        </S.Button>
      </S.ButtonContainer>
    </S.Header>
  );
};

export default AdminHeader;
