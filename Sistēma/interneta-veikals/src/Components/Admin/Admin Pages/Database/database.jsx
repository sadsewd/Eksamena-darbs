import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import AdminHeader from '../../Admin Header/AdminHeader';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Database = () => {
  const [table, setTable] = useState('');
  const [data, setData] = useState([]);
  const [keys, setkeys] = useState([]);
  const [temp, setTemp] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setkeys([]);
    setData([]);
    setTemp([]);
    FetchData();
  }, [table]);

  useEffect(() => {
    if (data) {
      setTemp(data[0]);
    }
    if (temp) {
      setkeys(Object.keys(temp));
    }
  }, [data, temp]);

  //This is bad but but whatever

  const FetchData = async () => {
    try {
      if (table !== '') {
        const res = await axios.get(`http://localhost:5001/${table}`);
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteData = async id => {
    try {
      await axios.delete(`http://localhost:5001/${table}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = event => {
    setTable(event.target.value);
  };

  const handleEdit = event => {
    navigate(`/admin/database/edit/${table}/${event.target.value}`);
  };

  const handleDelete = event => {
    DeleteData(event.target.value);
    FetchData();
  };

  const handleCreate = () => {
    if (table !== '') {
      navigate(`/admin/database/create/${table}`);
    }
  };

  const Table = () => {
    return (
      <>
        <table>
          <tbody>
            <tr>
              {keys.map((key, index) => {
                return <th key={index}>{key}</th>;
              })}
              <th>Rediģēšanas opcijas</th>
            </tr>
            {data.map((datakey, index) => {
              return (
                <tr key={index}>
                  {keys.map((key, i) => {
                    return <th key={i}>{datakey[keys[i]]}</th>;
                  })}
                  <th>
                    <button value={datakey.id} onClick={handleEdit}>
                      Mainīt
                    </button>
                    <button value={datakey.id} onClick={handleDelete}>
                      Dzēst
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <>
      <AdminHeader />
      <FormControl sx={{ mt: '20px', width: '90%', ml: '5%' }}>
        <InputLabel sx={{}}>Tabula</InputLabel>
        <Select value={table} label="Age" onChange={handleChange} sx={{}}>
          <MenuItem value={'administracija'}>Administracija</MenuItem>
          <MenuItem value={'groza_produkts'}>Groza produkts</MenuItem>
          <MenuItem value={'grozs'}>Grozs</MenuItem>
          <MenuItem value={'informacija'}>Infromacija</MenuItem>
          <MenuItem value={'kategorijas'}>Kategorijas</MenuItem>
          <MenuItem value={'lietotaja_informacija'}>Lietotaja informacija</MenuItem>
          <MenuItem value={'lietotaji'}>Lietotaji</MenuItem>
          <MenuItem value={'pasutijuma_pakalpojums'}>Pasutijuma pakalpojums</MenuItem>
          <MenuItem value={'pasutijuma_status'}>Pasutijuma status</MenuItem>
          <MenuItem value={'pasutijumi'}>Pasutijumi</MenuItem>
          <MenuItem value={'produkta_info'}>Produkta informacija</MenuItem>
          <MenuItem value={'produkta_info_has_variacijas_dati'}>Produkta info variacijas dati</MenuItem>
          <MenuItem value={'produkti'}>Produkti</MenuItem>
          <MenuItem value={'variacijas'}>Variacijas</MenuItem>
          <MenuItem value={'variacijas_dati'}>Variacijas dati</MenuItem>
        </Select>
        <button onClick={handleCreate}>Izveidot Ierakstu</button>
      </FormControl>
      {data ? <Table /> : <h1>Fetching data</h1>}
    </>
  );
};

export default Database;
