import React from 'react';
import * as S from '../Admin/Admin login/AdminLoginStyle';
import { useState } from 'react';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { Container, Paper } from '@mui/material';
import md5 from 'md5';
import URL from '../../url';

const LoginPage = () => {
  //Ielogošanas vērtību mainīgie
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  //Saņemtās atbildes mainīgais
  const [msg, setmsg] = useState();
  //Ielogošanās funkcija
  const signIn = useSignIn();
  //Navigācijas funkcija
  const navigate = useNavigate();

  //Funkcijas kuras tiek lietotas lai mainītu ielogošanās vērtības
  const handleUsernameInput = e => {
    setemail(e.target.value);
  };
  const handlePasswordInput = e => {
    setPassword(e.target.value);
  };

  //Funkcija lietota kad tiek nospiesta poga "Ielogoties"
  const onSubmit = async () => {
    //Tiek pārbaudīts vai ievadlauki nav tukši
    if (email !== '' && password !== '') {
      //Tiek izveidota nosūtāmā informācija (Parole tiek šifrēta un tad tā tiek salīdzināta ar paroli servera pusē)
      let authInfo = { epasts: email, parole: md5(password) };
      authInfo = new URLSearchParams(Object.entries(authInfo)).toString();
      try {
        //Dati tiek nosūtīti uz servera pusi
        const res = await axios.post(`${URL}/authClient`, authInfo);
        //Ja serveris atgriež token un lietotāja id tad lietotājs tiek ielogots
        if (res.data.token !== undefined) {
          //Šī funkcija izveido sesiju un saglabā dotots datus sīkdatnēs
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
          //Lietotājs tiek aizvests uz mājas sadaļu
          navigate('/');
        } else {
          //Ja dati ir nepareizi tiks parādīts dotais paziņojums
          setmsg('Nepareizs epasts un/vai parole!');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      //Ja ievadlauki ir tukši tiks parādīts dotais paziņojums
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
