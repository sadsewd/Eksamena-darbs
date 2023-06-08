import {
  Button,
  ButtonGroup,
  Container,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { textMarshal } from "text-marshal";

const Payment = () => {
  const navigate = useNavigate();
  const [pilnaAdrese, setadrese] = useState({
    adrese: "",
    pilseta: "",
    zipkods: "",
    vards: "",
    uzvards: "",
  });
  const [ApmaksasInfo, setApmaksasInfo] = useState({
    kartes_nr: "",
    termins: "",
    cvc: "",
  });
  const [data1, setData1] = useState();
  const [Price, setPrice] = useState(0);
  const [data, setdata] = useState();
  const [error, seterror] = useState();
  const [displayValues, setdisplayValues] = useState(["block", "none"]);

  useEffect(() => {
    setPrice(Number(JSON.parse(localStorage.getItem("price")).toFixed(2)));
  }, []);

  const setDataInfo = () => {
    let object = [];
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      object[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
    setData1(object);
  };

  const handleCancel = () => {
    localStorage.removeItem("price");
    navigate("/cart");
  };

  const handleContinue = () => {
    if (
      pilnaAdrese.adrese !== "" ||
      pilnaAdrese.pilseta !== "" ||
      pilnaAdrese.zipkods !== "" ||
      pilnaAdrese.vards !== "" ||
      pilnaAdrese.uzvards !== ""
    ) {
      console.log("oki");
      setdisplayValues(["none", "block"]);
    } else {
      console.log("You don goofed up");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    navigate("/");
  };

  return (
    <>
      <Header />

      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: "2rem",
          display: displayValues[0],
        }}
      >
        <Container container component={Paper} disableGutters>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
              gap: "1rem",
            }}
          >
            <Typography sx={{ textAlign: "center", fontSize: "1.5rem" }}>
              Adrese
            </Typography>
            <TextField
              value={pilnaAdrese.adrese}
              onChange={(event) => {
                setadrese({ ...pilnaAdrese, adrese: event.target.value });
              }}
              label="adrese"
            />
            <TextField
              value={pilnaAdrese.pilseta}
              onChange={(event) =>
                setadrese({ ...pilnaAdrese, pilseta: event.target.value })
              }
              label="pilseta"
            />
            <TextField
              value={pilnaAdrese.zipkods}
              onChange={(event) =>
                setadrese({ ...pilnaAdrese, zipkods: event.target.value })
              }
              label="zipkods"
            />
            <TextField
              value={pilnaAdrese.vards}
              onChange={(event) =>
                setadrese({ ...pilnaAdrese, vards: event.target.value })
              }
              label="vards"
            />
            <TextField
              value={pilnaAdrese.uzvards}
              onChange={(event) =>
                setadrese({ ...pilnaAdrese, uzvards: event.target.value })
              }
              label="uzvards"
            />
            <Button onClick={handleContinue}>Turpināt</Button>
          </form>
        </Container>
      </Container>

      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: "2rem",
          display: displayValues[1],
        }}
      >
        <Container container component={Paper} disableGutters>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
              gap: "1rem",
            }}
          >
            <Typography sx={{ textAlign: "center", fontSize: "1.5rem" }}>
              Apmaksa
            </Typography>
            <TextField
              value={ApmaksasInfo.kartes_nr}
              onChange={(event) => {
                setadrese({ ...ApmaksasInfo, kartes_nr: event.target.value });
              }}
              label="Kartes nummurs"
            />
            <TextField
              value={ApmaksasInfo.termins}
              onChange={(event) =>
                setadrese({ ...ApmaksasInfo, termins: event.target.value })
              }
              label="Derīgs līdz"
            />
            <TextField
              value={ApmaksasInfo.cvc}
              onChange={(event) =>
                setadrese({ ...ApmaksasInfo, cvc: event.target.value })
              }
              label="CVC"
            />
            <Button onClick={() => setdisplayValues(["block", "none"])}>
              Atpakaļ
            </Button>
            <Button onClick={handleSubmit}>Veikt apmaksu</Button>
          </form>
        </Container>
      </Container>

      <Footer />
    </>
  );
};

export default Payment;
