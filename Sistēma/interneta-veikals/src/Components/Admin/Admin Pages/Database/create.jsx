import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../../Admin Header/AdminHeader';

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

  useEffect(() => {
    FetchData();
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
    console.log(tempObj);
  };

  const handleSubmit = event => {
    event.preventDefault();
    delete tempObj.id;
    createData = new URLSearchParams(Object.entries(tempObj)).toString();
    console.log(createData);
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
      <h1>Izveidot jaunu vienumu tabulā {table}</h1>
      {keys.map((key, index) => {
        if (key === 'id') {
          display = 'none';
        } else {
          display = 'default';
        }
        return (
          <div key={index}>
            <input name={key} placeholder={key} onChange={handleInput} style={{ display: `${display}` }} />
          </div>
        );
      })}
      <button onClick={handleSubmit}>Iesniegt</button>
      <button onClick={handleCancel}>Atcelt</button>
    </>
  );
};

export default Create;
