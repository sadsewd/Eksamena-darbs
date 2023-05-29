import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import React, { useEffect, useState } from 'react';
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
} from '@mui/material';

const Cart = () => {
  const [data, setData] = useState();
  const [fullPrice, setfullPrice] = useState(0);
  const [skaits, setSkaits] = useState();
  let array = [];

  const handleCount = event => setSkaits(event.target.value);

  const handleMinus = () => {
    if (skaits > 0) {
      setSkaits(skaits - 1);
    }
  };

  const setDataInfo = () => {
    let object = [];
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      object[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
      let skaits = Number(object[i].skaits);
      array.push(skaits);
      setSkaits(prevValue => prevValue + skaits);
      let cena = Number(object[i].cena);
      let pilnaCena = cena * skaits;
      pilnaCena = Number(pilnaCena.toFixed(2));
      setfullPrice(prevValue => prevValue + pilnaCena);
      setfullPrice(prevValue => prevValue + pilnaCena);
    }
    setData(object);
  };

  useEffect(() => {
    setDataInfo();
  }, []);

  const removeItem = id => {
    console.log(id);
    setData(current => current.filter(key => key.id === id));
  };

  return (
    <>
      <Header />

      <TableContainer sx={{ mt: '2rem' }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produkta nosaukums</TableCell>
              <TableCell>Daduzums</TableCell>
              <TableCell>Cena</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ? data.map((key, index) => {
                  let skaits = Number(key.skaits);
                  let cena = Number(key.cena);
                  let pilnaCena = cena * skaits;
                  return (
                    <TableRow key={index}>
                      <TableCell>{key.nosaukums}</TableCell>
                      <TableCell>
                        <ButtonGroup variant="contained">
                          <Button onClick={() => setSkaits(skaits + 1)}>+</Button>
                          <Input
                            type="number"
                            sx={{ input: { textAlign: 'center' } }}
                            value={skaits}
                            onChange={handleCount}
                          />
                          <Button onClick={handleMinus}>-</Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell>{pilnaCena.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="outlined">Dzēst</Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              : ''}
          </TableBody>
        </Table>
      </TableContainer>
      <Container
        disableGutters
        maxWidth={false}
        sx={{ display: 'flex', justifyContent: 'space-between', p: '1rem 2rem', alignItems: 'center' }}
        component={Paper}
      >
        <Typography>Kopsumma {fullPrice.toFixed(2)}</Typography>
        <Button variant="outlined">Veikt apmaksu</Button>
      </Container>

      <Footer />
    </>
  );
};

export default Cart;
