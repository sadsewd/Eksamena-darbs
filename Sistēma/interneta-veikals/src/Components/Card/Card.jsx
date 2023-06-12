import { Button, Card, CardActionArea, CardActions, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const CardComp = props => {
  const cartItem = {
    id: null,
    skaits: 0,
    nosaukums: '',
  };

  //Produkta pievienošana grozam funkcija
  const handleAddToCart = event => {
    cartItem.id = event.target.value; //tiek saglabāts preces id
    if (props.dNol > cartItem.skaits) {
      //tiek pārbaudīts vai preču dudzums nepārkapj preču skaitu noliktavā
      cartItem.skaits = cartItem.skaits + 1; //tiek saglabāts preču daudzums
    }
    cartItem.daudzums_noliktava = props.dNol; //tiek cik preces ir pieejams noliktavā
    cartItem.cena = props.price; //tiek saglabāts preces cena
    cartItem.nosaukums = props.title; //tiek saglabāts preces nosaukums

    localStorage.setItem(event.target.value, JSON.stringify(cartItem)); //Dati par preci tiek saglabāti lokālajā krātuvē
    window.dispatchEvent(new Event('storage')); //Tiek izsaukts 'storage' gadījums, vajadzīgs lai automātiski atjaunotos preču skaita ikona uz groza ikonas
  };

  return (
    <Card variant="outlined" sx={{ textAlign: 'center' }}>
      <CardActionArea component={RouterLink} disabled={props.active} to={`/produkts/${props.itemId}`}>
        <CardMedia sx={{ objectFit: 'contain' }} component="img" height="240" image={props.imgsrc} />
        <Typography sx={{ mt: '.5rem' }}>{props.title}</Typography>
        <Typography>Kategorija - {props.Category}</Typography>
        <Typography>Cena - {props.price}€</Typography>
      </CardActionArea>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button disabled={props.active} size="small" onClick={handleAddToCart} value={props.itemId}>
          {props.active ? 'Izpārdots' : 'Ielikt grozā'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardComp;
