import {
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputMask from 'react-input-mask';

const Payment = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const navigate = useNavigate();
  const [data, setData] = useState();
  const [pilnaAdrese, setadrese] = useState({
    adrese: '',
    pilseta: '',
    zip_kods: '',
    vards: '',
    uzvards: '',
  });
  const [PasutijumaInfo, setPasutijumaInfo] = useState();
  const [ApmaksasInfo, setApmaksasInfo] = useState({
    kartes_nr: '',
    termins: '',
    cvc: '',
  });
  const [Price, setPrice] = useState(0);
  const [Couriers, setCouriers] = useState([{ Pakalpojuma_sniedzejs: '' }]);
  const [selectedCourier, setselectedCourier] = useState(1);
  const [error, seterror] = useState();
  const [displayValues, setdisplayValues] = useState(['flex', 'none', 'none']);

  useEffect(() => {
    setPrice(Number(JSON.parse(localStorage.getItem('price')).toFixed(2)));
    FetchCouriers();
    FetchData();
  }, []);

  useEffect(() => {
    if (data) {
      console.log('ye');
      setPasutijumaInfo({
        kopsumma: `${Price}`,
        pasutijuma_datums: `${day}.${month}.${year}`,
        Pasutijuma_pakalpojums_id: Number(selectedCourier),
        Pasutijuma_status_id: Number(data.statID),
        informacija_id: Number(data.pasID),
        Lietotaji_id: null,
      });
    }
  }, [data]);

  const FetchCouriers = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/pasutijuma_pakalpojums`);
      setCouriers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleContinue = () => {
    let displayval = displayValues;
    if (
      pilnaAdrese.adrese !== '' &&
      pilnaAdrese.pilseta !== '' &&
      pilnaAdrese.zip_kods !== '' &&
      !pilnaAdrese.zip_kods.includes('_') && //Needs to be checked for underscores since react-input-mask is adding them
      pilnaAdrese.vards !== '' &&
      pilnaAdrese.uzvards !== ''
    ) {
      pilnaAdrese.zip_kods = `LV-${pilnaAdrese.zip_kods}`;
      pilnaAdrese.kurjers = selectedCourier;
      setdisplayValues(['none', 'flex', 'none']);
    } else {
      seterror('Nav aizpidīti visi ievadlauki!');
      displayval[2] = 'flex';
      setdisplayValues(displayval);
    }
  };

  const handleSelectChange = event => {
    setselectedCourier(event.target.value);
  };

  const handleSubmit = event => {
    let displayval = displayValues;
    if (
      ApmaksasInfo.kartes_nr !== '' &&
      ApmaksasInfo.cvc !== '' &&
      ApmaksasInfo.termins !== '' &&
      !ApmaksasInfo.kartes_nr.includes('_') &&
      !ApmaksasInfo.cvc.includes('_') &&
      !ApmaksasInfo.termins.includes('_')
    ) {
      CreateData();
    } else {
      seterror('Nav aizpidīti visi ievadlauki!');
      displayval[2] = 'flex';
      setdisplayValues(displayval);
    }
  };

  const FetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/apmaksasInfo`);
      setData(res.data[0]);
      console.log(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const CreateData = async () => {
    let tempObj = { status: 'Tiek sagatavots piegādei' };
    console.log(PasutijumaInfo);
    let createData = new URLSearchParams(Object.entries(PasutijumaInfo)).toString();
    let createData1 = new URLSearchParams(Object.entries(pilnaAdrese)).toString();
    let createData2 = new URLSearchParams(Object.entries(tempObj)).toString();

    try {
      await axios.post(`http://localhost:5001/informacija`, createData1);
      await axios.post(`http://localhost:5001/pasutijuma_status`, createData2);
      await axios.post(`http://localhost:5001/pasutijumi`, createData);
      console.log(createData2);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      {Couriers ? (
        <Container
          maxWidth={false}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            mt: '2rem',
            display: displayValues[0],
          }}
        >
          <Container component={Paper} disableGutters>
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem',
                gap: '1rem',
              }}
            >
              <Typography sx={{ textAlign: 'center', fontSize: '1.5rem' }}>Adrese</Typography>
              <TextField
                inputProps={{ maxLength: 150 }}
                value={pilnaAdrese.adrese}
                onChange={event => {
                  setadrese({ ...pilnaAdrese, adrese: event.target.value });
                }}
                label="Adrese"
              />
              <TextField
                inputProps={{ maxLength: 45 }}
                value={pilnaAdrese.pilseta}
                onChange={event => setadrese({ ...pilnaAdrese, pilseta: event.target.value })}
                label="Pilseta"
              />
              <InputMask
                mask="9999"
                value={pilnaAdrese.zip_kods}
                onChange={event => setadrese({ ...pilnaAdrese, zip_kods: event.target.value })}
              >
                <TextField
                  label="Zipkods"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">LV-</InputAdornment>,
                  }}
                />
              </InputMask>
              <TextField
                inputProps={{ maxLength: 45 }}
                value={pilnaAdrese.vards}
                onChange={event => setadrese({ ...pilnaAdrese, vards: event.target.value })}
                label="Vards"
              />
              <TextField
                inputProps={{ maxLength: 45 }}
                value={pilnaAdrese.uzvards}
                onChange={event => setadrese({ ...pilnaAdrese, uzvards: event.target.value })}
                label="Uzvards"
              />
              <FormControl fullWidth>
                <InputLabel>Kurjers</InputLabel>
                <Select value={selectedCourier} label="Kurjers" onChange={handleSelectChange}>
                  {Couriers.map((key, index) => {
                    return (
                      <MenuItem key={index} value={key.id}>
                        {key.Pakalpojuma_sniedzejs} Cena: {key.Cena}€
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Button onClick={handleContinue}>Turpināt</Button>
            </form>
          </Container>
        </Container>
      ) : (
        ''
      )}

      <Container
        maxWidth={false}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          mt: '2rem',
          display: displayValues[1],
        }}
      >
        <Container component={Paper} disableGutters>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '2rem',
              gap: '1rem',
            }}
          >
            <Typography sx={{ textAlign: 'center', fontSize: '1.5rem' }}>Apmaksa</Typography>
            <InputMask
              mask="9999 9999 9999 9999"
              value={ApmaksasInfo.kartes_nr}
              onChange={event => {
                setApmaksasInfo({ ...ApmaksasInfo, kartes_nr: event.target.value });
              }}
            >
              <TextField label="Kartes nummurs" />
            </InputMask>
            <InputMask
              mask="99/99"
              value={ApmaksasInfo.termins}
              onChange={event => setApmaksasInfo({ ...ApmaksasInfo, termins: event.target.value })}
            >
              <TextField label="Derīgs līdz" />
            </InputMask>
            <InputMask
              mask="999"
              value={ApmaksasInfo.cvc}
              onChange={event => setApmaksasInfo({ ...ApmaksasInfo, cvc: event.target.value })}
            >
              <TextField label="CVC" />
            </InputMask>
            <Button onClick={handleSubmit}>Veikt apmaksu</Button>
            <Button onClick={() => setdisplayValues(['flex', 'none', 'none'])}>Atpakaļ</Button>
          </form>
        </Container>
      </Container>

      <Container
        sx={{
          borderRadius: '4px',
          textAlign: 'center',
          mt: '2rem',
          display: displayValues[2],
          justifyContent: 'center',
          background: 'red',
        }}
      >
        <Typography sx={{ padding: '2rem', width: '100%', fontSize: '1.3rem' }}>{error}</Typography>
      </Container>

      <Footer />
    </>
  );
};

export default Payment;
