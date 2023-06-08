import React from 'react';
import * as S from '../Admin/Admin login/AdminLoginStyle';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Paper } from '@mui/material';
import md5 from 'md5';

let passwd
let infoObj
let info

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameInput = e => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = e => {
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    if (username !== '' && password !== '') {
      passwd = md5(password)
      infoObj = {lietotajvards: username, parole: passwd}
      info = new URLSearchParams(Object.entries(infoObj)).toString();
      PostUser();
    } else {
      console.log('Nav ievadīta vajadzīgā informācija!');
    }
  };

  const PostUser = async () => {
    try {
      await axios.post(`http://localhost:5001/lietotaji`, info);
      navigate('/');
    } catch (err) {
      console.log(err);
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
        <S.Input required type="text" variant="outlined" label="Lietotājvārds" onChange={handleUsernameInput} />
        <S.Input required type="password" variant="outlined" label="Parole" onChange={handlePasswordInput} />
        <S.SButton variant="outlined" onClick={onSubmit}>
        Reģistrēties
        </S.SButton>
        <S.SButton variant="outlined" onClick={() => navigate('login')}>Ielogoties</S.SButton>
      </Paper>
    </Container>
  );
};
export default RegisterPage;
