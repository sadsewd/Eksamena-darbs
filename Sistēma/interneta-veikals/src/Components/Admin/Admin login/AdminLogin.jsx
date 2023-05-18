import React, { useEffect } from 'react';
import * as S from './AdminLoginStyle';
import { useState } from 'react';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState('');
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleUsernameInput = e => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = e => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSubmit = async () => {
    if (username !== '' || password !== '') {
      try {
        const res = await axios.get(`http://localhost:5001/adminLogin/${username}/${password}`);
        if ((password === res.data[0].parole) & (username === res.data[0].lietotajvards)) {
          signIn({
            token: res.headers['token'],
            expiresIn: 60,
            tokenType: 'Bearer',
            authState: { username: username },
          });
          navigate('/admin/home');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('Nav ievadīta vajadzīgā informācija!');
    }
  };

  return (
    <>
      <S.LoginContainer>
        <S.Form action="">
          <S.Text>Administrācijas ielogošanās</S.Text>
          <S.Input required type="text" variant="outlined" label="Lietotājvārds" onChange={handleUsernameInput} />
          <S.Input required type="password" variant="outlined" label="Parole" onChange={handlePasswordInput} />
          <S.SButton variant="outlined" onClick={onSubmit}>
            Ielogoties
          </S.SButton>
        </S.Form>
      </S.LoginContainer>
    </>
  );
};
export default LoginPage;
