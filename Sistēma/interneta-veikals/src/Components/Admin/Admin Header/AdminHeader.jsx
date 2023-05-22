import React from 'react';
import * as S from './AdminHeaderStyle';
import { useSignOut } from 'react-auth-kit';
import { Button, Link } from '@mui/material';

const AdminHeader = () => {
  const signOut = useSignOut();

  return (
    <S.Header>
      <S.ButtonContainer>
        <Button variant="text" value="home">
          <Link underline="none" href="/admin/home">
            Pārskats
          </Link>
        </Button>
        <Button variant="text" value="database">
          <Link underline="none" href="/admin/database">
            Datubāze
          </Link>
        </Button>
        <Button variant="text" onClick={signOut}>
          Izlogoties
        </Button>
      </S.ButtonContainer>
    </S.Header>
  );
};

export default AdminHeader;
