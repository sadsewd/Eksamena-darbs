import React from 'react';
import * as S from './AdminHeaderStyle';
import { useAuthUser, useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { Button, Link } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const signOut = useSignOut();

  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const navigate = useNavigate();

useEffect(()=>{
  if (!isAuthenticated || auth().userType !== 'admin') {
    navigate('/');
  }
},[])

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
