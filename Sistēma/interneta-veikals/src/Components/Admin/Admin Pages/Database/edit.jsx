import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminHeader from '../../Admin Header/AdminHeader';
import { Button, TextField } from '@mui/material';
import * as S from './databasestyle';

let tempObj = {};
let tempValue;
let tempId;
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
    if (data) {
      setkeys(Object.keys(data));
      tempObj = data;
    }
  }, [data]);

  useEffect(() => {
    keys.forEach(element => {
      if (element === 'id') {
        tempObj[element] = id;
      } else {
        tempObj[element] = '';
      }
    });
  }, [keys]);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/${table}/${id}`);
      setData(res.data[0]);
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
    delete tempObj.id;
    updateData = new URLSearchParams(Object.entries(tempObj)).toString();
    UpdataData();
  };

  const handleInput = event => {
    tempValue = event.target.value;
    tempId = event.target.name;
    tempObj[tempId] = tempValue;
  };

  const handleCancel = () => {
    navigate('/admin/database');
  };

  return (
    <>
      <AdminHeader />
      <S.StyledForm>
        {keys.map((key, index) => {
          if (key === 'id') {
            isreadonly = true;
          } else {
            isreadonly = false;
          }
          return (
            <div key={index}>
              <label>{key}</label>
              <br />
              <S.Input
                name={key}
                placeholder={data[key]}
                onChange={handleInput}
                InputProps={{
                  readOnly: isreadonly,
                }}
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
      </S.StyledForm>
    </>
  );
};

export default Edit;
