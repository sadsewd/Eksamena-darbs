import React from 'react';
import * as S from './headerStyle';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <>
      <S.Header>
        <S.ButtonContainer>
          <img src="../" alt="" />
          <S.HeaderButton>Elektrotehnika</S.HeaderButton>
          <S.HeaderButton>Mēbeles</S.HeaderButton>
          <S.HeaderButton>Dārzam</S.HeaderButton>
          <S.HeaderButton>Bērniem</S.HeaderButton>
          <S.HeaderButton>Tūrismam</S.HeaderButton>
        </S.ButtonContainer>
        <S.SideFunctionsContainer>
          <SearchBar />
          <S.LoginButton to={'/login'}>Ielogoties</S.LoginButton>
        </S.SideFunctionsContainer>
      </S.Header>
    </>
  );
};

export default Header;
