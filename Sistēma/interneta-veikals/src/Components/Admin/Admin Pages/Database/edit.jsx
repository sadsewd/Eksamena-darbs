import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminHeader from '../../Admin Header/AdminHeader';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import URL from '../../../../url';

let isreadonly = false;
let updateData;

const Edit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const table = params.table;
  const [data, setData] = useState([]);
  const [keys, setkeys] = useState([]);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const res = await axios.get(`${URL}/${table}/${id}`);
      setData(res.data[0]);
      setkeys(Object.keys(res.data[0]));
    } catch (err) {
      console.log(err);
    }
  };

  //Datu atjaunošanas funkcija
  const UpdataData = async () => {
    try {
      await axios.put(`${URL}/${table}/${id}`, updateData); //Tiek nosūtīti dati uz sistēmas servera pusi uz doto galapunktu
      navigate('/admin/database'); //Kad dati ir nosūtīti lietotājs ir atgriezsts uz datubāzes sadaļu
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = event => {
    //Nospiežot pogu "Iesniegt" veiktā funkcija
    event.preventDefault();
    const isEmpty = Object.values(data).every(x => x === ''); //Tiek pārbaudīts vai objekta visas īpašības nav tukšas
    if (isEmpty) {
      //Tiek ja ir īpašības satur tikai tukšumus, iesnegšana tiek atcelta, jo ja datus lietotājs vēlās dzēst, tas ir jādara caur dzēst pogu
      handleCancel();
    } else {
      // Ja objekts satur vērtības tad tiek izveidots mainīgais kurš satur ievadlauku datus kuri tiek konvertēti uz x-www-form-urlencoded formātu
      updateData = new URLSearchParams(Object.entries(data)).toString();
      UpdataData(); //Tiek izsaukta datu atjaunošanas funkcija
    }
  };

  const handleInput = (event, key) => {
    setData({ ...data, [key]: event.target.value });
  };

  const handleCancel = () => {
    navigate('/admin/database');
  };

  return (
    <>
      <AdminHeader />
      <Container
        sx={{ width: '45%', height: '91.5vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Paper
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem',
            textAlign: 'center',
            justifyContent: 'center',
          }}
          variant="outlined"
        >
          {keys.map((key, index) => {
            if (key === 'id') {
              isreadonly = true;
            } else {
              isreadonly = false;
            }

            return (
              <div key={index}>
                <Typography>{key}</Typography>
                <br />
                {key === 'parole' ? (
                  <TextField
                    sx={{ width: '100%' }}
                    name={key}
                    placeholder="Paslēpts"
                    onChange={event => handleInput(event, key)}
                    InputProps={{
                      readOnly: isreadonly,
                    }}
                    variant="outlined"
                  />
                ) : (
                  <TextField
                    sx={{ width: '100%' }}
                    name={key}
                    value={data[key].toString()}
                    onChange={event => handleInput(event, key)}
                    InputProps={{
                      readOnly: isreadonly,
                    }}
                    variant="outlined"
                  />
                )}
              </div>
            );
          })}
          <Button variant="outlined" sx={{ p: '1rem' }} onClick={handleSubmit}>
            Iesniegt
          </Button>
          <Button variant="outlined" sx={{ p: '1rem' }} onClick={handleCancel}>
            Atcelt
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default Edit;
