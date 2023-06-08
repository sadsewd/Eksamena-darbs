import { Button, Container } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Categories = () => {
    const [categories, setcategories] = useState();
    const navigate = useNavigate();
    
    useEffect(() => {
        FetchCategories();
    }, [])

    const FetchCategories = async () => {
        try {
          const res = await axios.get(`http://localhost:5001/kategorijas`);
          setcategories(res.data);
        } catch (err) {
          console.log(err);
        }
      };
    return ( 
        <>
        <Header/>
        {categories && <Container sx={{display: "flex", flexDirection: 'column', gap: "1rem", mt: '1rem', justifyContent:'center'}}>{categories.map((key) => {
            return(<Button sx={{p: '1rem'}} variant="contained" onClick={() => navigate(`/katalogs/${key.id}`)}>{key.nosaukums}</Button>)
        })}</Container>}
        
        <Footer/>
        </>
     );
}
 
export default Categories;