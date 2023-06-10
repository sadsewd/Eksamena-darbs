import React from 'react';
import * as S from './AdminLoginStyle';
import { useState } from 'react';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { Container, Paper } from '@mui/material';
import md5 from 'md5';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setmsg] = useState();
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleUsernameInput = e => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = e => {
    setPassword(e.target.value);
  };

  const onSubmit = async () => {
    if (username !== '' && password !== '') {
      try {
        let authInfo = { lietotajvards: username, parole: md5(password) };
        authInfo = new URLSearchParams(Object.entries(authInfo)).toString();
        const res = await axios.post(`http://localhost:5001/authAdmin`, authInfo);
        if (res.data.token !== undefined) {
          signIn({
            token: res.data.token,
            expiresIn: 60,
            tokenType: 'Bearer',
            authState: { username: username, userType: 'admin' },
          });
          navigate('/admin/home');
        } else {
          setmsg('Nepareizs epasts un/vai parole!');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setmsg('Nav ievadīta vajadzīgā informācija!');
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
        <S.Text>Administrācijas ielogošanās</S.Text>
        <S.Input required type="text" variant="outlined" label="Lietotājvārds" onChange={handleUsernameInput} />
        <S.Input required type="password" variant="outlined" label="Parole" onChange={handlePasswordInput} />
        <S.SButton variant="outlined" onClick={onSubmit}>
          Ielogoties
        </S.SButton>
        {msg && <Container sx={{ textAlign: 'center', background: 'red', p: '1rem' }}>{msg}</Container>}
      </Paper>
    </Container>
  );
};
export default LoginPage;
