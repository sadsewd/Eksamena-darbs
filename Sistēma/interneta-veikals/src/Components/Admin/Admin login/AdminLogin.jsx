import React from 'react';
import * as S from './AdminLoginStyle';
import { useState } from 'react';

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const handleUsernameInput = (e) => {
        setUsername(e.target.value);
    } 
    const [password, setPassword] = useState("");
    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    } 

    return ( 
        <>
        <S.LoginContainer>
            <S.Form action="">
                <S.Text>Administrācijas ielogošanās</S.Text>
                <S.Input type="text" variant="outlined" label='Lietotājvārds' onChange={handleUsernameInput}/>
                <S.Input type="password" variant="outlined" label='Parole' onChange={handlePasswordInput}/>
                <S.SButton variant="outlined" type="submit">Ielogoties</S.SButton>
            </S.Form>
        </S.LoginContainer>
        </>
     );
}
export default LoginPage;