import React, { useState } from "react";
import * as S from "./headerStyle" 

const SearchBar = () => {

    const [input, setInput] = useState("");
    const handleInput = (e) => {
        setInput(e.target.value);
    } 

    return ( 
        <S.StyledInput type="text" value={input} onChange={handleInput} placeholder="Meklēt preces..."/>
     );
}
 
export default SearchBar;