import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import Footer from '../Footer/Footer';
import * as S from './inputStyle';
import URL from '../../url';

const ItemPage = () => {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState();
  const [info, setInfo] = useState();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [direction, setDirection] = useState('row');
  const [width, setWidth] = useState(['80%', '20%']);
  const [size, setSize] = useState(['2rem', '1.3rem']);

  const cartItem = {
    id: null,
    skaits: 0,
  };

  const handleAddToCart = event => {
    cartItem.id = event.target.value;
    cartItem.cena = data.cena;
    cartItem.nosaukums = data.nosaukums;
    if (cartItem.skaits < data.daudzums_noliktava) {
      cartItem.skaits += count;
    }
    cartItem.daudzums_noliktava = data.daudzums_noliktava;
    localStorage.setItem(event.target.value, JSON.stringify(cartItem));
    window.dispatchEvent(new Event('storage'));
  };

  useEffect(() => {
    if (data !== undefined) {
      if (count < 0) {
        setCount(0);
      }
      if (count > data.daudzums_noliktava) {
        setCount(data.daudzums_noliktava);
      }
    }
  }, [count]);
  //This makes sure that user can never add more items than the available stock

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCount = event => setCount(event.target.value);

  const handleMinus = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    FetchProduct();
    FetchInfo();
    if (window.innerWidth < '1024') {
      setDirection('column');
      setWidth(['100%', '100%']);
      setSize(['1.3rem', '1rem']);
    } else {
      setWidth(['80%', '20%']);
      setDirection('row');
      setSize(['2rem', '1.3rem']);
    }
  }, []);
  //checks screen size on initial render and fetches data

  //Funkcija ar kuru tiek pārbaudīts ekrāna lielums, un iestatīti komponenšu a lielumu un citu īpašību vērtības
  const handleResize = () => {
    if (window.innerWidth < '1024') {
      setDirection('column');
      setWidth(['100%', '100%']);
      setSize(['1.3rem', '1rem']);
    } else {
      setWidth(['80%', '20%']);
      setSize(['2rem', '1.3rem']);
      setDirection('row');
    }
  };
  //checks screen size on screen size change

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
  }, []);

  const FetchProduct = async () => {
    try {
      const res = await axios.get(`${URL}/prece/${id}`);
      setData(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  const FetchInfo = async () => {
    try {
      const res = await axios.get(`${URL}/variacijasDati/${id}`);
      setInfo(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      {data ? (
        <>
          <Container
            disableGutters
            maxWidth={false}
            sx={{
              width: '98vw',
              mt: '1rem',
              display: 'flex',
              gap: '1rem',
              flexDirection: direction,
            }}
          >
            <Container
              maxWidth={false}
              component={Paper}
              sx={{
                width: width[0],
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ fontSize: size[0], mb: '1rem' }}>{data.nosaukums}</Typography>
              <Box
                onClick={handleOpen}
                component="img"
                sx={{
                  borderRadius: '.25rem',
                  objectFit: 'cover',
                  ':hover': { cursor: 'pointer' },
                }}
                src={data.attels}
                height="360px"
              />
              <Modal open={open} onClose={handleClose}>
                <Box
                  component="img"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50vw',
                    maxHeight: '95vh',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 0,
                    objectFit: 'cover',
                  }}
                  src={data.attels}
                />
              </Modal>
            </Container>
            <Container
              maxWidth={false}
              sx={{
                width: width[1],
                display: 'flex',
                padding: '1rem',
                gap: '2rem',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
              component={Paper}
            >
              <Typography sx={{ fontSize: '1.3rem', textAlign: 'center' }}>Cena {data.cena}€</Typography>
              <Tooltip title="Produktu daudzums">
                <ButtonGroup variant="contained">
                  <Button onClick={() => setCount(count + 1)}>+</Button>
                  <S.SInput
                    type="number"
                    sx={{ input: { textAlign: 'center' } }}
                    value={count}
                    onChange={handleCount}
                    disabled
                  />
                  <Button onClick={handleMinus}>-</Button>
                </ButtonGroup>
              </Tooltip>
              <Typography sx={{ color: 'gray' }}>Pieejams: {data.daudzums_noliktava}</Typography>

              <Button variant="outlined" value={data.id} onClick={handleAddToCart} sx={{ bottom: '0', width: '100%' }}>
                Ielikt grozā
              </Button>
            </Container>
          </Container>

          <Container
            component={Paper}
            maxWidth={false}
            sx={{
              mb: '2.5rem',
              mt: '1rem',
              display: 'flex',
              width: '98vw',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ textAlign: 'center', fontSize: size[0], mt: '1rem' }}>Produkta specifikācijas</Typography>
            <Container maxWidth={false} sx={{ display: 'flex', flexDirection: 'row' }}>
              <Container maxWidth={false}>
                <List>
                  <ListItem
                    sx={{
                      textAlign: 'center',
                      borderBottom: 'solid orange 1px',
                    }}
                  >
                    <ListItemText
                      primary={<Typography sx={{ fontSize: size[1] }}>Specifikacijas nosaukums</Typography>}
                    />
                  </ListItem>
                  {info
                    ? info.map((key, index) => {
                        return (
                          <ListItem key={index} sx={{ textAlign: 'center' }}>
                            <ListItemText
                              primary={<Typography sx={{ fontSize: size[1] }}>{key.variacijas_nos}</Typography>}
                            />
                          </ListItem>
                        );
                      })
                    : ''}
                </List>
              </Container>
              <Container maxWidth={false}>
                <List>
                  <ListItem
                    sx={{
                      textAlign: 'center',
                      borderBottom: 'solid orange 1px',
                    }}
                  >
                    <ListItemText
                      primary={<Typography sx={{ fontSize: size[1] }}>Specifikacijas vertība</Typography>}
                    />
                  </ListItem>
                  {info
                    ? info.map((key, index) => {
                        return (
                          <ListItem key={index} sx={{ textAlign: 'center' }}>
                            <ListItemText
                              primary={<Typography sx={{ fontSize: size[1] }}>{key.variacijas_vert}</Typography>}
                            />
                          </ListItem>
                        );
                      })
                    : ''}
                </List>
              </Container>
            </Container>
          </Container>
        </>
      ) : (
        ''
      )}
      <Footer />
    </>
  );
};

export default ItemPage;
