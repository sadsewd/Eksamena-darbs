import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const CardComp = (props) => {
  const cartItem = {
    id: null,
    skaits: 0,
    nosaukums: "",
  };

  const handleAddToCart = (event) => {
    cartItem.id = event.target.value;
    if (props.dNol > cartItem.skaits) {
      cartItem.skaits = cartItem.skaits + 1;
    }
    cartItem.daudzums_noliktava = props.dNol;
    cartItem.cena = props.price;
    cartItem.nosaukums = props.title;

    localStorage.setItem(event.target.value, JSON.stringify(cartItem));
    window.dispatchEvent(new Event("storage"));
  };
  return (
    <Card variant="outlined" sx={{ textAlign: "center" }}>
      <CardActionArea
        component={RouterLink}
        disabled={props.active}
        to={`/produkts/${props.itemId}`}
      >
        <CardMedia
          sx={{ objectFit: "contain" }}
          component="img"
          height="240"
          image={props.imgsrc}
        />
        <Typography sx={{ mt: ".5rem" }}>{props.title}</Typography>
        <Typography>Kategorija - {props.Category}</Typography>
        <Typography>Cena - {props.price}€</Typography>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          disabled={props.active}
          size="small"
          onClick={handleAddToCart}
          value={props.itemId}
        >
          {props.active ? "Izpārdots" : "Ielikt grozā"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardComp;
