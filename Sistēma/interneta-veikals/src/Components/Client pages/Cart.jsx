import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [data, setData] = useState();
  const [fullPrice, setfullPrice] = useState(0.0);
  const [temp, setTemp] = useState(0);
  let array = [];

  const setDataInfo = () => {
    let object = [];
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      object[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
      let skaits = Number(object[i].skaits);
      array.push(skaits);
      let cena = Number(object[i].cena);
      let pilnaCena = cena * skaits;
      pilnaCena = Number(pilnaCena.toFixed(2));
      setfullPrice((prevValue) => prevValue + pilnaCena);
    }
    setData(object);
  };

  const updateFieldChanged = (index) => (event) => {
    let newArr = [...data];

    if (event.target.value === "plus") {
      if (newArr[index].skaits < newArr[index].daudzums_noliktava) {
        newArr[index].skaits = newArr[index].skaits + 1;
        localStorage.setItem(newArr[index].id, JSON.stringify(newArr[index]));
      }
    } else if (event.target.value === "minus") {
      if (newArr[index].skaits > 1) {
        newArr[index].skaits = newArr[index].skaits - 1;
      }
      localStorage.setItem(newArr[index].id, JSON.stringify(newArr[index]));
    } else if (event.target.value === "delete") {
      localStorage.removeItem(newArr[index].id);
      delete newArr[index];
    }

    setData(newArr);
    setTemp((temp) => temp + 1);
  };

  useEffect(() => {
    setDataInfo();
  }, []);

  useEffect(() => {
    setData((items) => items.filter((n) => n));
    window.dispatchEvent(new Event("storage"));
  }, [temp]);
  //Removes emtpy elements from the array, causes an error if not filtered.

  window.addEventListener("storage", () => {
    updatePrice();
  });

  const updatePrice = () => {
    let object = [];
    let count = 0.0;
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      object[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
      count = count + Number(object[i].cena) * Number(object[i].skaits);
    }
    setfullPrice(count);
  };

  const navigate = useNavigate();

  const handlePayment = () => {
    localStorage.setItem("price", JSON.stringify(fullPrice));
    navigate("/payment");
  };

  return (
    <>
      <Header />
      {localStorage.length > 0 ? (
        <>
          <TableContainer sx={{ mt: "2rem" }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Produkta nosaukums</TableCell>
                  <TableCell>Daduzums</TableCell>
                  <TableCell>Cena 1x</TableCell>
                  <TableCell>Cena</TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  ? data.map((key, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{key.nosaukums}</TableCell>
                          <TableCell>
                            <ButtonGroup variant="contained">
                              <Button
                                onClick={updateFieldChanged(index)}
                                value="plus"
                              >
                                +
                              </Button>
                              <Input
                                type="number"
                                sx={{ input: { textAlign: "center" } }}
                                value={key.skaits}
                                disabled
                              />
                              <Button
                                onClick={updateFieldChanged(index)}
                                value="minus"
                              >
                                -
                              </Button>
                            </ButtonGroup>
                          </TableCell>
                          <TableCell>{Number(key.cena).toFixed(2)}</TableCell>
                          <TableCell>
                            {(Number(key.cena).toFixed(2) * key.skaits).toFixed(
                              2
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              onClick={updateFieldChanged(index)}
                              value="delete"
                            >
                              Dzēst
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : ""}
              </TableBody>
            </Table>
          </TableContainer>
          <Container
            disableGutters
            maxWidth={false}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              p: "1rem 2rem",
              alignItems: "center",
            }}
            component={Paper}
          >
            <Typography>Kopsumma {fullPrice.toFixed(2)}</Typography>
            <Button variant="outlined" onClick={handlePayment}>
              Veikt apmaksu
            </Button>
          </Container>
        </>
      ) : (
        <Container
          sx={{
            backgroundColor: "#c44545",
            mt: "20vh",
            height: "50vh",
            fontSize: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: ".5rem",
          }}
        >
          Nav preču grozā
        </Container>
      )}

      <Footer />
    </>
  );
};

export default Cart;
