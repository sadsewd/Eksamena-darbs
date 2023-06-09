import React from "react";
import * as S from "../Admin/Admin login/AdminLoginStyle";
import { useState } from "react";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Container, Paper } from "@mui/material";
import md5 from "md5";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async () => {
    if (username !== "" && password !== "") {
      try {
        const res = await axios.get(
          `http://localhost:5001/klientLogin/${username}/${md5(password)}`
        );
        if (
          (md5(password) === res.data[0].parole) &
          (username === res.data[0].lietotajvards)
        ) {
          signIn({
            token: res.headers["token"],
            expiresIn: 60,
            tokenType: "Bearer",
            authState: {
              username: username,
              userType: "client",
              userid: res.data[0].id,
            },
          });
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Nav ievadīta vajadzīgā informācija!");
    }
  };

  return (
    <Container
      sx={{
        width: "50%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
          height: "50vh",
        }}
        variant="outlined"
      >
        <S.Text>Ielogošanās</S.Text>
        <S.Input
          required
          type="text"
          variant="outlined"
          label="Lietotājvārds"
          onChange={handleUsernameInput}
        />
        <S.Input
          required
          type="password"
          variant="outlined"
          label="Parole"
          onChange={handlePasswordInput}
        />
        <S.SButton variant="outlined" onClick={onSubmit}>
          Ielogoties
        </S.SButton>
        <S.SButton variant="outlined" onClick={() => navigate("/register")}>
          Reģistrēties
        </S.SButton>
      </Paper>
    </Container>
  );
};
export default LoginPage;
