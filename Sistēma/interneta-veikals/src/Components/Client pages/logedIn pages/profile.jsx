import React, { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { Button, ButtonGroup, Container, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import URL from '../../../url';

const Profile = () => {
  const auth = useAuthUser();
  const [Data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${URL}/klientaInfo/${auth().userid}`);
      setData(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  let TextProps = { fontSize: '1.3rem', color: 'orange', borderBottom: '1px solid orange', width: '100%' };

  return (
    <>
      <Header />
      <Container
        sx={{ display: 'flex', height: '90vh', width: '75vw', justifyContent: 'Center', alignItems: 'center' }}
      >
        {Data && (
          <Container
            disableGutters
            maxWidth={false}
            component={Paper}
            sx={{
              height: '90%',
              gap: '2.5vw',
              p: '2rem',
              alignItems: 'center',
              justifyContent: 'Center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography sx={TextProps}>Vards: {Data.vards}</Typography>
            <Typography sx={TextProps}>Uzvards: {Data.uzvards}</Typography>
            <Typography sx={TextProps}>Epasts: {auth().email}</Typography>
            <Typography sx={TextProps}>Adrese: {Data.adrese}</Typography>
            <Typography sx={TextProps}>Pilseta: {Data.pilseta}</Typography>
            <Typography sx={TextProps}>Zip-kods: {Data.zip_kods}</Typography>
            <Button onClick={() => navigate('/datumaina')} sx={{ width: '100%', p: '1rem' }} variant="outlined">
              Mainīt datus
            </Button>

            <Button sx={{ width: '100%', p: '1rem' }} onClick={() => navigate('/vesture')} variant="outlined">
              Pirkumu Vēsture
            </Button>
          </Container>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
