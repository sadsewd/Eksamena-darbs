import React from 'react';
import * as S from '../Admin/Admin login/AdminLoginStyle';
import { useState } from 'react';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { Container, Paper } from '@mui/material';
import md5 from 'md5';

const LoginPage = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setmsg] = useState();
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleUsernameInput = e => {
    setemail(e.target.value);
  };
  const handlePasswordInput = e => {
    setPassword(e.target.value);
  };

  const onSubmit = async () => {
    if (email !== '' && password !== '') {
      let authInfo = { epasts: email, parole: md5(password) };
      authInfo = new URLSearchParams(Object.entries(authInfo)).toString();
      try {
        const res = await axios.post(`http://localhost:5001/authClient`, authInfo);
        if (res.data.token !== undefined) {
          signIn({
            token: res.data.token,
            expiresIn: 60,
            tokenType: 'Bearer',
            authState: {
              email: email,
              userType: 'client',
              userid: res.data.id,
            },
          });
          navigate('/');
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
    <Container
      sx={{
        width: '50%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
        <S.Text>Ielogošanās</S.Text>
        <S.Input required type="text" variant="outlined" label="E-pasts" onChange={handleUsernameInput} />
        <S.Input required type="password" variant="outlined" label="Parole" onChange={handlePasswordInput} />
        <S.SButton variant="outlined" onClick={onSubmit}>
          Ielogoties
        </S.SButton>
        <S.SButton variant="outlined" onClick={() => navigate('/register')}>
          Reģistrēties
        </S.SButton>
        {msg && <Container sx={{ textAlign: 'center', background: 'red', p: '1rem' }}>{msg}</Container>}
      </Paper>
    </Container>
  );
};
export default LoginPage;
