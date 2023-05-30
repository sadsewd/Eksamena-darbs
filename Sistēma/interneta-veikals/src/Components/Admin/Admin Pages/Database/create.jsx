import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../../Admin Header/AdminHeader';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import md5 from 'md5';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';

let tempObj = {};
let tempValue;
let tempId;
let display = 'default';
let createData;

const Create = () => {
  const [data, setData] = useState([]);
  const [keys, setkeys] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const table = params.table;

  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  useEffect(() => {
    FetchData();
    if (!isAuthenticated || auth().userType !== 'admin') {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (data) {
      setkeys(Object.keys(data));
    }
  }, [data]);

  const FetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/${table}`);
      setData(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleInput = event => {
    tempValue = event.target.value;
    tempId = event.target.name;
    tempObj[tempId] = tempValue;
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (tempObj.parole !== undefined) {
      tempObj.parole = md5(tempObj.parole);
    }
    delete tempObj.id;
    createData = new URLSearchParams(Object.entries(tempObj)).toString();
    CreateData();
    navigate('/admin/database');
  };

  const CreateData = async () => {
    try {
      await axios.post(`http://localhost:5001/${table}`, createData);
      navigate('/admin/database');
    } catch (err) {
      console.log(err);
    }
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
            height: '40vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
          variant="outlined"
        >
          <Typography sx={{ fontSize: '1.5rem' }}>Jauns vienums tabulā {table}</Typography>
          {keys.map((key, index) => {
            if (key === 'id') {
              display = 'none';
            } else {
              display = 'default';
            }
            return (
              <div key={index}>
                <TextField
                  sx={{ width: '100%', display: display }}
                  name={key}
                  placeholder={key}
                  onChange={handleInput}
                  variant="outlined"
                />
              </div>
            );
          })}
          <Button variant="outlined" onClick={handleSubmit}>
            Iesniegt
          </Button>
          <Button variant="outlined" onClick={handleCancel}>
            Atcelt
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default Create;
