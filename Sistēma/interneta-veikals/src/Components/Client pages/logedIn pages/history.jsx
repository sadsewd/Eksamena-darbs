import React, { useEffect, useState } from 'react';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import axios from 'axios';
import { useAuthUser } from 'react-auth-kit';
import { Container, Paper, Typography } from '@mui/material';
import URL from '../../../url';

const History = () => {
  const auth = useAuthUser();
  const [data, setData] = useState();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${URL}/klientaPirkumuInfo/${auth().userid}`);
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const textSX = { fontSize: '1.3rem', p: '2rem 0' };
  return (
    <>
      <Header />
      {data && (
        <Container
          maxWidth={false}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            mt: '1rem',
          }}
        >
          {data.map((key, index) => {
            return (
              <Container
                key={index}
                maxWidth={false}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                component={Paper}
              >
                <Typography sx={textSX}>Pasūtijuma id: {key.id}</Typography>
                <Typography sx={textSX}>Pasūtijuma datums: {key.pasutijuma_datums}</Typography>
                <Typography sx={textSX}>Pasūtijuma kopsumma: {key.kopsumma}€</Typography>
              </Container>
            );
          })}
        </Container>
      )}
      <Footer />
    </>
  );
};

export default History;
