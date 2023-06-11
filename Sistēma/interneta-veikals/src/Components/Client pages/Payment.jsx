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
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import URL from '../../url';

const Payment = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const [compareData, setcompareData] = useState();
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const navigate = useNavigate();
  const [id, setid] = useState();
  const [data, setData] = useState();
  const [pilnaAdrese, setadrese] = useState({
    adrese: '',
    pilseta: '',
    zip_kods: '',
    vards: '',
    uzvards: '',
  });
  const [PasutijumaInfo, setPasutijumaInfo] = useState({});
  const [ApmaksasInfo, setApmaksasInfo] = useState({
    kartes_nr: '',
    termins: '',
    cvc: '',
  });
  const [Couriers, setCouriers] = useState([{ Pakalpojuma_sniedzejs: '' }]);
  const [selectedCourier, setselectedCourier] = useState(1);
  const [error, seterror] = useState();
  const [displayValues, setdisplayValues] = useState(['flex', 'none', 'none']);
  const [pasHasProd, setpasHasProd] = useState({});
  const [pasHasProdMax, setpasHasProdMax] = useState();
  const [pasID, setpasID] = useState();
  const [CartItems, setCartItems] = useState();
  const [loggedIn, setloggedIn] = useState(false);
  const [userhasdata, setusehasdata] = useState();
  useEffect(() => {
    FetchCouriers();
    setDataInfo();
    if (auth()) {
      if (auth().userType === 'client') {
        setloggedIn(true);
        fetchUserData();
      }
    } else {
      FetchData();
    }
  }, []);

  useEffect(() => {
    FetchData();
  }, [userhasdata]);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${URL}/klientaInfo/${auth().userid}`);
      if (res.data[0] !== undefined) {
        setadrese(res.data[0]);
        setusehasdata(true);
        setid(res.data[0].Lietotaji_id);
        setcompareData(res.data[0]);
      } else {
        setusehasdata(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (pasID && CartItems) {
      sortObj();
    }
  }, [pasID]);

  const setDataInfo = () => {
    let array = [];
    let object = [];
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      object[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (typeof object[i] === 'object') {
        array.push(object[i]);
      }
    }
    setCartItems(array);
  };

  const sortObj = () => {
    let temp = [];
    let temp1 = [];
    for (let index = 0; index < CartItems.length; index++) {
      const element = CartItems[index];
      temp[index] = {
        daudzums: element.skaits,
        Produkti_id: element.id,
        Pasutijumi_id: pasID,
      };
      if (element.daudzums_noliktava !== undefined) {
        temp1.push(element.daudzums_noliktava);
      }
    }
    setpasHasProdMax(temp1);
    setpasHasProd(temp);
  };

  const FetchCouriers = async () => {
    try {
      const res = await axios.get(`${URL}/pasutijuma_pakalpojums`);
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
      !pilnaAdrese.zip_kods.includes('_') && //Needs to be checked for underscores since react-input-mask is replacing required character with them
      pilnaAdrese.vards !== '' &&
      pilnaAdrese.uzvards !== ''
    ) {
      if (!pilnaAdrese.zip_kods.includes('LV-')) {
        pilnaAdrese.zip_kods = `LV-${pilnaAdrese.zip_kods}`;
      }
      if (isAuthenticated()) {
        if ((auth().userType = 'client')) {
          pilnaAdrese.Lietotaji_id = auth().userid;
        }
      }
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

  const handleSubmit = () => {
    let displayval = displayValues;
    if (
      ApmaksasInfo.kartes_nr !== '' &&
      ApmaksasInfo.cvc !== '' &&
      ApmaksasInfo.termins !== '' &&
      !ApmaksasInfo.kartes_nr.includes('_') &&
      !ApmaksasInfo.cvc.includes('_') &&
      !ApmaksasInfo.termins.includes('_')
    ) {
      if (auth() && userhasdata === true) {
        SetClientData();
      } else {
        CreateData();
      }
    } else {
      seterror('Nav aizpidīti visi ievadlauki!');
      displayval[2] = 'flex';
      setdisplayValues(displayval);
    }
  };

  const SetClientData = async () => {
    let temp = pilnaAdrese;
    delete temp.Lietotaji_id;

    temp = new URLSearchParams(Object.entries(temp)).toString();
    try {
      await axios.put(`${URL}/klientaInfo/${auth().userid}`, temp);
      CreateDataUser();
    } catch (err) {
      console.log(err);
    }
  };

  const FetchData = async () => {
    try {
      const res = await axios.get(`${URL}/apmaksasInfo`);
      const res1 = await axios.get(`${URL}/apmaksasInfo1`);
      const res2 = await axios.get(`${URL}/apmaksasInfo2`);
      setData(res.data[0]);
      setpasID(res1.data[0].pasID);
      if (auth() && id) {
        setPasutijumaInfo({
          kopsumma: Number(JSON.parse(localStorage.getItem('price')).toFixed(2)),
          pasutijuma_datums: `${day}.${month}.${year}`,
          Pasutijuma_pakalpojums_id: Number(selectedCourier),
          Pasutijuma_status_id: Number(res2.data[0].statID),
          informacija_id: id,
          Lietotaji_id: auth().userid,
        });
      } else if (auth() && userhasdata === false) {
        setPasutijumaInfo({
          kopsumma: Number(JSON.parse(localStorage.getItem('price')).toFixed(2)),
          pasutijuma_datums: `${day}.${month}.${year}`,
          Pasutijuma_pakalpojums_id: Number(selectedCourier),
          Pasutijuma_status_id: Number(res2.data[0].statID),
          informacija_id: Number(res.data[0].infoID),
          Lietotaji_id: auth().userid,
        });
      } else {
        setPasutijumaInfo({
          kopsumma: Number(JSON.parse(localStorage.getItem('price')).toFixed(2)),
          pasutijuma_datums: `${day}.${month}.${year}`,
          Pasutijuma_pakalpojums_id: Number(selectedCourier),
          Pasutijuma_status_id: Number(res2.data[0].statID),
          informacija_id: Number(res.data[0].infoID),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const CreateDataUser = async () => {
    let tempObj = { status: 'Tiek sagatavots piegādei' };
    let createData2 = new URLSearchParams(Object.entries(tempObj)).toString();
    try {
      await axios.post(`${URL}/pasutijuma_status`, createData2);
      createData0();
    } catch (err) {
      console.log(err);
    }
  };

  const CreateData = async () => {
    let tempObj = { status: 'Tiek sagatavots piegādei' };
    let createData1 = new URLSearchParams(Object.entries(pilnaAdrese)).toString();
    let createData2 = new URLSearchParams(Object.entries(tempObj)).toString();
    try {
      await axios.post(`${URL}/informacija`, createData1);
      await axios.post(`${URL}/pasutijuma_status`, createData2);
      createData0();
    } catch (err) {
      console.log(err);
    }
  };

  const createData0 = async () => {
    let createData3 = new URLSearchParams(Object.entries(PasutijumaInfo)).toString();
    try {
      await axios.post(`${URL}/pasutijumi`, createData3);
      createDatairoot();
    } catch (err) {
      console.log(err);
    }
  };
  const createDatairoot = async () => {
    let createData = '';
    let changeData1 = '';
    let changeData2 = '';
    let i = 0;
    try {
      for (const element of pasHasProd) {
        createData = new URLSearchParams(Object.entries(element)).toString();
        let count = Number(pasHasProdMax[i]) - Number(element.daudzums);
        changeData1 = { daudzums_noliktava: count };
        await axios.post(`${URL}/produkti_has_pasutijumi`, createData);
        changeData2 = new URLSearchParams(Object.entries(changeData1)).toString();
        await axios.put(`${URL}/produktaInfoMaina/${pasHasProd[i].Produkti_id}`, changeData2);
        i++;
      }
      localStorage.clear();
      navigate('/');
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
                setApmaksasInfo({
                  ...ApmaksasInfo,
                  kartes_nr: event.target.value,
                });
              }}
            >
              <TextField label="Kartes nummurs" />
            </InputMask>
            <InputMask
              mask="99/99"
              value={ApmaksasInfo.termins}
              onChange={event =>
                setApmaksasInfo({
                  ...ApmaksasInfo,
                  termins: event.target.value,
                })
              }
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
