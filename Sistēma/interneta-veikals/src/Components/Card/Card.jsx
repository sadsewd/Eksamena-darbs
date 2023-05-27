import { Button, Card, CardActionArea, CardActions, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const CardComp = props => {
  const cartItem = {
    id: null,
    skaits: 0,
  };

  const handleAddToCart = event => {
    cartItem.id = event.target.value;
    cartItem.skaits = cartItem.skaits + 1;
    localStorage.setItem(event.target.value, JSON.stringify(cartItem));
    window.dispatchEvent(new Event('storage'));
  };
  return (
    <Card variant="outlined" sx={{ textAlign: 'center' }}>
      <CardActionArea component={RouterLink} to={`/produkts/${props.itemId}`}>
        <CardMedia sx={{ objectFit: 'contain' }} component="img" height="240" image={props.imgsrc} />
        <Typography sx={{ mt: '.5rem' }}>{props.title}</Typography>
        <Typography sx={{ mb: '.5rem' }}>Kategorija - {props.Category}</Typography>
      </CardActionArea>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button size="small" onClick={handleAddToCart} value={props.itemId}>
          Ielikt grozā
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardComp;
