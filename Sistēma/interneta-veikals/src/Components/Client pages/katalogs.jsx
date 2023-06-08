import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Container, Grid, Typography } from '@mui/material';
import CardComp from '../Card/Card';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Katalogs = () => {
  const [data, setData] = useState([{}]);
  const params = useParams();
  const [kategorija, setkategorija] = useState(false);

  useEffect(() => {
    if(Object.keys(params).length === 0){
      FetchData();
      setkategorija(false);
    }else{
      FetchKategoryItems();
      setkategorija(true);
    }
  }, []);

  const FetchKategoryItems = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/kategorijasPreces/${params.id}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const FetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/visasPreces`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <Container
        sx={{
          m: '1rem auto',
          height: '10rem',
          display: 'flex',
          backgroundColor: '#201e66',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '.5rem',
        }}
      >
        <Typography sx={{ fontSize: '2.5rem' }}>{kategorija ? `Preces zem kategorijas ${data[0].kategorija}` : "Katalogs"}</Typography>
      </Container>
      <Grid container sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        {data
          ? data.map((key, index) => {
              return (
                <Grid key={index} item={true} xs={11.8} sm={5.8} md={5.8} lg={2.8} xl={2.8}>
                  <CardComp
                    key={index}
                    title={key.nosaukums}
                    imgsrc={key.attels}
                    Category={key.kategorija}
                    itemId={key.id}
                    price={key.cena}
                  />
                </Grid>
              );
            })
          : ''}
      </Grid>

      <Footer />
    </>
  );
};

export default Katalogs;
