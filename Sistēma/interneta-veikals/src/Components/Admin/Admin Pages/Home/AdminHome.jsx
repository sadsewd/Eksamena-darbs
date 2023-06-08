import React, { useEffect, useState } from 'react';
import AdminHeader from '../../Admin Header/AdminHeader';
import { Container, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    FetchData();
    FetchData1();
    FetchData2();
  }, []);

  const FetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/precuInfo`);
      setData(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  const FetchData1 = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/klientuInfo`);
      setData1(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  const FetchData2 = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/pasutijumuInfo`);
      setData2(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const gridStyle = {
    p: '1rem',
    textAlign: 'center',
  };

  const textStyle = {
    fontSize: '1.3rem',
  };

  const containerStyle = {
    mt: '.5rem',
    fontSize: '1.3rem',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: '10rem',
    width: '5rem',
    height: '5rem',
    justifyContent: 'center',
  };

  return (
    <>
      <AdminHeader />
      <Grid container sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', mt: '1rem' }}>
        {data ? (
          <>
            <Grid component={Paper} item xs={5.5} sx={gridStyle}>
              <Typography sx={textStyle}>Preču skaits</Typography>
              <Container sx={containerStyle}>{data.skaits}</Container>
            </Grid>
            <Grid component={Paper} item xs={5.5} sx={gridStyle}>
              <Typography sx={textStyle}>Preču skaits noliktavā</Typography>
              <Container sx={containerStyle}>{data.daudzums}</Container>
            </Grid>
          </>
        ) : (
          <h1>Nav datu par precēm!</h1>
        )}
        {data1 ? (
          <>
            <Grid component={Paper} item xs={5.5} sx={gridStyle}>
              <Typography sx={textStyle}>Reģistrētu klientu skaits</Typography>
              <Container sx={containerStyle}>{data1.skaits}</Container>
            </Grid>
          </>
        ) : (
          <h1>Nav datu par klientiem!</h1>
        )}
        {data2 ? (
          <>
            <Grid component={Paper} item xs={5.5} sx={gridStyle}>
              <Typography sx={textStyle}>Pasūtijumu skaits</Typography>
              <Container sx={containerStyle}>{data2.skaits}</Container>
            </Grid>
          </>
        ) : (
          <h1>Nav datu par pasūtijumiem!</h1>
        )}
      </Grid>
    </>
  );
};
export default AdminHome;
