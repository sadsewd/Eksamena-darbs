import { Button, Container, Paper, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import URL from '../../../url';

const ChangeData = () => {
  const auth = useAuthUser();
  const navigate = useNavigate();
  const [Data, setData] = useState();
  let TextProps = { fontSize: '1.3rem', color: 'orange', width: '100%' };
  const [msg, setmsg] = useState();
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

  const handelNameChange = e => {
    console.log(Data);
    setData({
      ...Data,
      vards: e.target.value,
    });
  };
  const handelSurnameChange = e => {
    setData({
      ...Data,
      uzvards: e.target.value,
    });
  };
  const handelAdressChange = e => {
    setData({
      ...Data,
      adrese: e.target.value,
    });
  };
  const handelCityChange = e => {
    setData({
      ...Data,
      pilseta: e.target.value,
    });
  };
  const handelCodeChange = e => {
    setData({
      ...Data,
      zip_kods: e.target.value,
    });
  };

  const handleSubmit = async () => {
    let temp = Data;
    delete temp.Lietotaji_id;
    delete temp.id;
    temp = new URLSearchParams(Object.entries(temp)).toString();
    if (
      Data.vards !== '' &&
      Data.uzvards !== '' &&
      Data.adrese !== '' &&
      Data.pilseta !== '' &&
      Data.zip_kods !== '' &&
      Data.zip_kods.includes('LV-')
    ) {
      try {
        await axios.put(`${URL}/klientaInfo/${auth().userid}`, temp);
        navigate('/profils');
      } catch (err) {
        console.log(err);
      }
    } else {
      setmsg('Tukši ievadlauki un/vai nederīgi dati (Zipkods nesatur "LV-")');
    }
  };

  return (
    <>
      <Header />
      <Container
        sx={{ display: 'flex', height: '90vh', width: '75vw', justifyContent: 'Center', alignItems: 'center' }}
      >
        {Data && (
          <Container
            component={Paper}
            disableGutters
            maxWidth={false}
            sx={{
              height: '90%',
              gap: '2.5vw',
              p: '1rem',
              alignItems: 'center',
              justifyContent: 'Center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TextField onChange={handelNameChange} label="Vards" sx={TextProps} value={Data.vards} />
            <TextField onChange={handelSurnameChange} sx={TextProps} label="Uzvards" value={Data.uzvards} />
            <TextField onChange={handelAdressChange} label="Adrese" sx={TextProps} value={Data.adrese} />
            <TextField onChange={handelCityChange} label="Pilseta" sx={TextProps} value={Data.pilseta} />
            <TextField onChange={handelCodeChange} label="Zip-kods" sx={TextProps} value={Data.zip_kods} />
            <Button sx={{ width: '100%', p: '1rem' }} onClick={handleSubmit} variant="outlined">
              Mainīt datus
            </Button>
            <Button
              sx={{ width: '100%', color: 'red', p: '1rem' }}
              onClick={() => navigate('/profils')}
              variant="outlined"
            >
              Atcelt
            </Button>
            {msg && <Container sx={{ textAlign: 'center', background: 'red', p: '1rem' }}>{msg}</Container>}
          </Container>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default ChangeData;
