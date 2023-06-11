import React from 'react';
import * as S from '../Admin/Admin login/AdminLoginStyle';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Paper } from '@mui/material';
import md5 from 'md5';
import URL from '../../url';

let infoObj;

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [msg, setmsg] = useState();

  const handleUsernameInput = e => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = e => {
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    if (username !== '' && username.includes('@') && username.includes('.') && password !== '') {
      infoObj = { epasts: username, parole: md5(password) };
      infoObj = new URLSearchParams(Object.entries(infoObj)).toString();
      PostUser();
    } else {
      setmsg('Ievadītie dati ir nederīgi');
    }
  };

  const PostUser = async () => {
    let res = await axios.post(`${URL}/clientReg`, infoObj);
    if (res.data === 'Konts veiksmīgi izveidots!') {
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      setmsg(res.data);
    } else {
      setmsg(res.data);
    }
  };

  return (
    <Container sx={{ width: '50%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem',
          height: '50vh',
        }}
        variant="outlined"
      >
        <S.Text>Reģistrācija</S.Text>
        <S.Input required type="text" variant="outlined" label="E-pasts" onChange={handleUsernameInput} />
        <S.Input required type="password" variant="outlined" label="Parole" onChange={handlePasswordInput} />
        <S.SButton variant="outlined" onClick={onSubmit}>
          Reģistrēties
        </S.SButton>
        <S.SButton variant="outlined" onClick={() => navigate('/login')}>
          Ielogoties
        </S.SButton>
        {msg === 'Konts veiksmīgi izveidots!' && (
          <Container sx={{ textAlign: 'center', background: 'green', p: '1rem' }}>{msg}</Container>
        )}
        {msg === 'Konts ar šo epastu pastāv!' && (
          <Container sx={{ textAlign: 'center', background: 'red', p: '1rem' }}>{msg}</Container>
        )}
        {msg === 'Ievadītie dati ir nederīgi' && (
          <Container sx={{ textAlign: 'center', background: 'red', p: '1rem' }}>{msg}</Container>
        )}
      </Paper>
    </Container>
  );
};
export default RegisterPage;
