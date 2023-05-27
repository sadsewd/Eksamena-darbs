import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Input,
  List,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  Table,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Footer from '../Footer/Footer';
import * as S from './inputStyle';

const ItemPage = () => {
  const [data, setData] = useState();
  const [info, setInfo] = useState();
  const params = useParams();
  const id = params.id;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [count, setCount] = useState(0);
  const handleCount = event => setCount(event.target.value);
  const [direction, setDirection] = useState('row');
  const [width, setWidth] = useState(['80%', '20%']);

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
    } else {
      setWidth(['80%', '20%']);
      setDirection('row');
    }
  }, []);

  const handleResize = () => {
    if (window.innerWidth < '1024') {
      setDirection('column');
      setWidth(['100%', '100%']);
    } else {
      setWidth(['80%', '20%']);
      setDirection('row');
    }
  };
  React.useEffect(() => {
    window.addEventListener('resize', handleResize, false);
  }, []);

  const FetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/prece/${id}`);
      setData(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  const FetchInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/variacijasDati/${id}`);
      setInfo(res.data);
      console.log(res.data);
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
              sx={{ width: width[0], padding: '1rem', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
            >
              <Typography sx={{ fontSize: '2rem', mb: '1rem' }}>{data.nosaukums}</Typography>
              <Box
                onClick={handleOpen}
                component="img"
                sx={{ borderRadius: '.25rem', objectFit: 'cover', ':hover': { cursor: 'pointer' } }}
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
                  />
                  <Button onClick={handleMinus}>-</Button>
                </ButtonGroup>
              </Tooltip>
              <Button variant="outlined" sx={{ bottom: '0', width: '100%' }}>
                Ielikt grozā
              </Button>
            </Container>
          </Container>

          <Container
            component={Paper}
            maxWidth={false}
            sx={{ mb: '2.5rem', mt: '1rem', display: 'flex', width: '98vw', flexDirection: 'column' }}
          >
            <Typography sx={{ textAlign: 'center', fontSize: '2rem', mt: '1rem' }}>Produkta specifikācijas</Typography>
            <Container maxWidth={false} sx={{ display: 'flex', flexDirection: 'row' }}>
              <Container maxWidth={false}>
                <List>
                  <ListItem sx={{ textAlign: 'center', borderBottom: 'solid orange 1px' }}>
                    <ListItemText
                      primary={<Typography sx={{ fontSize: '1.3rem' }}>Specifikacijas nosaukums</Typography>}
                    />
                  </ListItem>
                  {info
                    ? info.map((key, index) => {
                        return (
                          <ListItem sx={{ textAlign: 'center' }}>
                            <ListItemText
                              primary={<Typography sx={{ fontSize: '1.3rem' }}>{key.variacijas_nos}</Typography>}
                            />
                          </ListItem>
                        );
                      })
                    : ''}
                </List>
              </Container>
              <Container maxWidth={false}>
                <List>
                  <ListItem sx={{ textAlign: 'center', borderBottom: 'solid orange 1px' }}>
                    <ListItemText
                      primary={<Typography sx={{ fontSize: '1.3rem' }}>Specifikacijas vertība</Typography>}
                    />
                  </ListItem>
                  {info
                    ? info.map((key, index) => {
                        return (
                          <ListItem sx={{ textAlign: 'center' }}>
                            <ListItemText
                              primary={<Typography sx={{ fontSize: '1.3rem' }}>{key.variacijas_vert}</Typography>}
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
