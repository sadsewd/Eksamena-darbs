import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminHeader from '../../Admin Header/AdminHeader';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';

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
      const res = await axios.get(`http://localhost:5001/${table}/${id}`);
      setData(res.data[0]);
      setkeys(Object.keys(res.data[0]));
    } catch (err) {
      console.log(err);
    }
  };

  const UpdataData = async () => {
    try {
      await axios.put(`http://localhost:5001/${table}/${id}`, updateData);
      navigate('/admin/database');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const isEmpty = Object.values(data).every(x => x === '');
    if (isEmpty) {
      handleCancel();
    } else {
      updateData = new URLSearchParams(Object.entries(data)).toString();
      UpdataData();
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
