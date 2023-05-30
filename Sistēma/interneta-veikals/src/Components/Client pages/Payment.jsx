import {
  Button,
  ButtonGroup,
  Container,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import e from 'cors';
import axios from 'axios';

let tempObj = {};
let tempObj1 = {};
let tempObj2 = {};

let createData;
let createData1;
let createData2;

const Payment = () => {
  const loggedin = useIsAuthenticated();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [data1, setData1] = useState();
  const [adresstab, setAdressTab] = useState(true);
  const [adrese, setadrese] = useState('');
  const [pilseta, setpilseta] = useState('');
  const [zipkods, setzipkods] = useState('');
  const [vards, setvards] = useState('');
  const [uzvards, setuzvards] = useState('');
  const [courier, setcourier] = useState('');
  const [courierid, setcourierid] = useState('');
  const [courierPrice, setcourierPrice] = useState(0);
  const [Price, setPrice] = useState(0);

  const [productInfo, setproductInfo] = useState(0);
  const [status, setstatus] = useState();
  const [info, setinfo] = useState();
  const [orders, setorders] = useState();

  useEffect(() => {
    FetchCourier();
    FetchInfo();
    FetchStatus();
    FetchOrders();
    FetchProductInfo();
    setPrice(Number(JSON.parse(localStorage.getItem('price')).toFixed(2)));
  }, []);

  const setDataInfo = () => {
    let object = [];
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      object[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
    setData1(object);
  };

  const handleChange = event => {
    setcourierid(event.target.value);
  };

  useEffect(() => {
    if (data) {
      setcourier(data[courierid - 1].Pakalpojuma_sniedzejs);
      setcourierPrice(Number(data[courierid - 1].Cena).toFixed(2));
    }
  }, [courierid]);

  const handleCancel = () => {
    localStorage.removeItem('price');
    navigate('/cart');
  };

  const FetchCourier = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/pasutijuma_pakalpojums`);
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const FetchProductInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/produkta_info`);
      setproductInfo(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const FetchInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/informacija`);
      setinfo(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const FetchStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/pasutijuma_status`);
      setstatus(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const FetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/pasutijuma_status`);
      setorders(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const CreatePurchaseData = async () => {
    try {
      await axios.post(`http://localhost:5001/pasutijumi`, createData);
    } catch (err) {
      console.log(err);
    }
  };

  const CreateInfoData = async () => {
    try {
      await axios.post(`http://localhost:5001/pasutijumi`, createData1);
    } catch (err) {
      console.log(err);
    }
  };

  const CreateProductOrderData = async () => {
    let object = [];
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      object[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
      createData2.Produkti_id = object[i].id;
      createData2.Pasutijumi_id = orders.length + 1;
      createData2.daudzums = object[i].skaits;
      createData2 = new URLSearchParams(Object.entries(createData2)).toString();

      try {
        await axios.post(`http://localhost:5001/produkti_has_pasutijumi`, createData2);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    tempObj.id = orders.length + 1;
    tempObj.kopsumma = (Number(Price) + Number(courierPrice)).toFixed(2);
    tempObj.pasutijuma_datums = `${day}.${month}.${year}`;
    tempObj.Pasutijuma_pakalpoums = courierid;
    tempObj.Pasutijuma_status_id = status.length;
    tempObj.informacija_id = info.length;
    tempObj.Lietotaji_id = '';

    tempObj1.adrese = adrese;
    tempObj1.pilseta = pilseta;
    tempObj1.zip_kods = zipkods;
    tempObj1.vards = vards;
    tempObj1.uzvards = uzvards;
    tempObj1.Lietotaji_id = '';

    createData1 = new URLSearchParams(Object.entries(tempObj1)).toString();
    createData = new URLSearchParams(Object.entries(tempObj)).toString();

    CreateInfoData();
    CreatePurchaseData();
    CreateProductOrderData();
    UpdataData();
    navigate('/');
  };

  const UpdataData = async () => {
    let object;
    let id;
    let updateData;
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      object[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
      id = object[i].id;
      updateData.daudzums_noliktava = Number(productInfo[id].daudzums_noliktava) - Number(object[id].skaits);
      try {
        await axios.put(`http://localhost:5001/produkta_info/${id}`, updateData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Header />

      {data && (
        <>
          <Container
            maxWidth={false}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '2rem' }}
          >
            <Container
              container
              component={Paper}
              disableGutters
              sx={{ display: 'flex', flexDirection: 'column', p: '2rem', gap: '1rem' }}
            >
              <Typography sx={{ textAlign: 'center', fontSize: '1.5rem' }}>Apmaksa</Typography>
              <TextField value={adrese} onChange={event => setadrese(event.target.value)} label="adrese" />
              <TextField value={pilseta} onChange={event => setpilseta(event.target.value)} label="pilseta" />
              <TextField value={zipkods} onChange={event => setzipkods(event.target.value)} label="zipkods" />
              <TextField value={vards} onChange={event => setvards(event.target.value)} label="vards" />
              <TextField value={uzvards} onChange={event => setuzvards(event.target.value)} label="uzvards" />
            </Container>
          </Container>

          <Container
            maxWidth={false}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '2rem' }}
          >
            <Container
              container
              component={Paper}
              disableGutters
              sx={{ display: 'flex', flexDirection: 'column', p: '2rem', gap: '1rem' }}
            >
              <Typography sx={{ textAlign: 'center', fontSize: '1.5rem' }}>Apmaksa</Typography>
              <TextField label="Kartes nummurs" />
              <TextField label="CVC" />
              <TextField label="Derīguma termiņš" />
              <Typography>Kopsumma: {(Number(Price) + Number(courierPrice)).toFixed(2)}€</Typography>

              <InputLabel>Piegāde</InputLabel>
              <Select value={courierid} label="Piegāde" onChange={handleChange} sx={{}}>
                {data.map((datakey, index) => {
                  return (
                    <MenuItem value={datakey.id}>
                      {datakey.Pakalpojuma_sniedzejs}, cena: {datakey.Cena}€
                    </MenuItem>
                  );
                })}
              </Select>
              <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5rem' }}>
                <Button variant="outlined" onClick={handleCancel}>
                  Atcelt
                </Button>
                <Button variant="outlined" onClick={handleSubmit}>
                  Veikt apmaksu
                </Button>
              </Container>
            </Container>
          </Container>
        </>
      )}

      <Footer />
    </>
  );
};

export default Payment;
