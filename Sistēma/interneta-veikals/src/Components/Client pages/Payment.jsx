import {
  Button,
  ButtonGroup,
  Container,
  FormControl,
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
  const [Couriers, setCouriers] = useState([{ Pakalpojuma_sniedzejs: "" }]);
  const [selectedCourier, setselectedCourier] = useState();
  const [error, seterror] = useState();
  const [displayValues, setdisplayValues] = useState(["block", "none", "none"]);

  useEffect(() => {
    setPrice(Number(JSON.parse(localStorage.getItem("price")).toFixed(2)));
    FetchCouriers();
  }, []);

  const setDataInfo = () => {
    let object = [];
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      object[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
    setData1(object);
  };

  const FetchCouriers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/pasutijuma_pakalpojums`
      );
      setCouriers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    navigate("/cart");
  };

  const handleContinue = () => {
    let displayval = displayValues;
    if (
      pilnaAdrese.adrese !== "" ||
      pilnaAdrese.pilseta !== "" ||
      pilnaAdrese.zipkods !== "" ||
      pilnaAdrese.vards !== "" ||
      pilnaAdrese.uzvards !== ""
    ) {
      displayval[0] = "none";
      displayval[1] = "block";
      displayval[2] = "none";
      setdisplayValues(displayval);
    } else {
      seterror("Nav aizpidīti visi ievadlauki!");
      displayval[2] = "block";
      setdisplayValues(displayval);
    }
  };

  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setselectedCourier(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let displayval = displayValues;
    if (
      ApmaksasInfo.kartes_nr !== "" ||
      ApmaksasInfo.cvc !== "" ||
      ApmaksasInfo.termins !== ""
    ) {
      navigate("/");
    } else {
      seterror("Nav aizpidīti visi ievadlauki!");
      displayval[2] = "block";
      setdisplayValues(displayval);
    }
  };

  return (
    <>
      <Header />
      {Couriers ? (
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
              <FormControl fullWidth>
                <InputLabel>Kurjers</InputLabel>
                <Select
                  value={selectedCourier}
                  label="Kurjers"
                  onChange={handleSelectChange}
                >
                  {Couriers.map((key, index) => {
                    return (
                      <MenuItem key={index} value={key.Pakalpojuma_sniedzejs}>
                        {key.Pakalpojuma_sniedzejs}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Button onClick={handleContinue}>Turpināt</Button>
            </form>
          </Container>
        </Container>
      ) : (
        ""
      )}

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
        <Container component={Paper} disableGutters>
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

      <Container
        sx={{
          display: "flex",
          textAlign: "center",
          mt: "2rem",
          display: displayValues[2],
        }}
      >
        <Typography
          sx={{ padding: "2rem", background: "red", fontSize: "1.3rem" }}
        >
          {error}
        </Typography>
      </Container>

      <Footer />
    </>
  );
};

export default Payment;
