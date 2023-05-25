import { Button, Card, CardActionArea, CardActions, CardMedia, Typography } from '@mui/material';
import React from 'react';

const CardComp = props => {
  return (
    <Card variant="outlined" sx={{ textAlign: 'center' }}>
      <CardActionArea>
        <CardMedia sx={{ objectFit: 'contain' }} component="img" height="240" image={props.imgsrc} />
        <Typography sx={{ mt: '.5rem' }}>{props.title}</Typography>
        <Typography sx={{ mb: '.5rem' }}>Kategorija - {props.Category}</Typography>
      </CardActionArea>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button size="small" value={props.itemId}>
          Ielikt grozā
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardComp;
