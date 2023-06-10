import React, { useEffect, useState } from 'react';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import axios from 'axios';
import { useAuthUser } from 'react-auth-kit';
import { Container } from '@mui/material';

const History = () => {
  const auth = useAuthUser();
  const [data, setData] = useState();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/klientaPirkumuInfo/${auth().userid}`);
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Header />
      <Container></Container>
      <Footer />
    </>
  );
};

export default History;
