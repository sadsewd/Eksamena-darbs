import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Container, Grid, Typography } from '@mui/material';
import CardComp from '../Card/Card';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import URL from '../../url';

const Katalogs = () => {
  const [data, setData] = useState([{}]);
  const params = useParams();
  const [kategorija, setkategorija] = useState(false);
  const [meklesana, setmeklesana] = useState(false);
  const [katalogs, setkatlogs] = useState(false);
  const location = useLocation();
  const [searchTerm, setsearchTerm] = useState();
  const [filteredData, setfilteredData] = useState();

  useEffect(() => {
    if (Object.keys(params).length === 0 && !location.pathname.includes('/katalogs/termins/')) {
      setkatlogs(true);
      FetchData();
      setkategorija(false);
      setmeklesana(false);
      setfilteredData();
    } else if (location.pathname.includes('/katalogs/termins/')) {
      setmeklesana(true);
      FetchData();
      setsearchTerm(params.id);
      setkatlogs(false);
      setkategorija(false);
    } else {
      setfilteredData();
      setkategorija(true);
      FetchKategoryItems();
      setmeklesana(false);
      setkatlogs(false);
    }
  }, [location]);

  useEffect(() => {
    if (meklesana) {
      tempObj = data.filter(findSearchItems);
      setfilteredData(tempObj);
    }
  }, [data]);

  let tempObj;

  function findSearchItems(item) {
    let name = item.nosaukums.toLowerCase();
    let sTerm = searchTerm.toLowerCase();
    if (name.includes(sTerm)) {
      return item.nosaukums;
    }
  }

  const FetchKategoryItems = async () => {
    try {
      const res = await axios.get(`${URL}/kategorijasPreces/${params.id}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const FetchData = async () => {
    try {
      const res = await axios.get(`${URL}/visasPreces`);
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
        <Typography sx={{ fontSize: '2.5rem' }}>
          {meklesana && `Meklēt ${searchTerm}`}
          {kategorija && `Kategorija "${data[0].kategorija}"`}
          {katalogs && 'Katalogs'}
        </Typography>
      </Container>
      <Grid container sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        {filteredData
          ? filteredData.map((key, index) => {
              return (
                <Grid key={index} item={true} xs={11.8} sm={5.8} md={5.8} lg={2.8} xl={2.8}>
                  <CardComp
                    key={index}
                    title={key.nosaukums}
                    imgsrc={key.attels}
                    Category={key.kategorija}
                    itemId={key.id}
                    price={key.cena}
                    dNol={key.daudzums_noliktava}
                    active={key.daudzums_noliktava > 0 ? false : true}
                  />
                </Grid>
              );
            })
          : data.map((key, index) => {
              return (
                <Grid key={index} item={true} xs={11.8} sm={5.8} md={5.8} lg={2.8} xl={2.8}>
                  <CardComp
                    key={index}
                    title={key.nosaukums}
                    imgsrc={key.attels}
                    Category={key.kategorija}
                    itemId={key.id}
                    price={key.cena}
                    dNol={key.daudzums_noliktava}
                    active={key.daudzums_noliktava > 0 ? false : true}
                  />
                </Grid>
              );
            })}
      </Grid>

      <Footer />
    </>
  );
};

export default Katalogs;
