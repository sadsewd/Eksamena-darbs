import * as React from 'react';
import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Paper, Select, TableContainer } from '@mui/material';
import AdminHeader from '../../Admin Header/AdminHeader';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
      FetchData();
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
  };

  const handleCreate = () => {
    if (table !== '') {
      navigate(`/admin/database/create/${table}`);
    }
  };

  const TableComp = () => {
    return (
      <TableContainer
        sx={{ width: '100vw', display: 'flex', alignItems: 'center', margin: '2rem 0', justifyContent: 'center' }}
      >
        <Table sx={{ width: '90vw' }} component={Paper}>
          <TableHead>
            <TableRow>
              {keys.map((key, index) => {
                return (
                  <TableCell sx={{ textAlign: 'center' }} key={index}>
                    {key}
                  </TableCell>
                );
              })}
              <TableCell sx={{ textAlign: 'center' }}>Rediģēšanas opcijas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((datakey, index) => {
              return (
                <TableRow key={index}>
                  {keys.map((key, i) => {
                    return (
                      <TableCell sx={{ textAlign: 'center' }} key={i}>
                        {datakey[keys[i]]}
                      </TableCell>
                    );
                  })}
                  <TableCell sx={{ textAlign: 'center' }}>
                    <ButtonGroup>
                      <Button value={datakey.id} onClick={handleEdit}>
                        Mainīt
                      </Button>
                      <Button value={datakey.id} onClick={handleDelete}>
                        Dzēst
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      <AdminHeader />
      <FormControl sx={{ mt: '2rem', width: '90%', ml: '5%' }}>
        <InputLabel sx={{ color: 'white' }}>Tabula</InputLabel>
        <Select value={table} label="Tabula" onChange={handleChange} sx={{}}>
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
        {table ? (
          <Button variant="outlined" sx={{ mt: '1rem' }} onClick={handleCreate}>
            Izveidot Ierakstu
          </Button>
        ) : (
          ''
        )}
      </FormControl>
      {table ? <TableComp /> : ''}
    </>
  );
};

export default Database;
