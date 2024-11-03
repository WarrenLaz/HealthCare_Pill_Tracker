import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'

export const Supp = () => {
    const[supplements, setsupplements] = useState([]);
    const[search, setsearch] = useState([]);

    const searchbar = (event) =>{
        setsearch(event.target.value);
    }

    async function submit(e){
        e.preventDefault();
        console.log(search);
        try{
            await axios.post("http://localhost:8000/supple", {search}).then(resp => {setsupplements(resp.data)})
        }catch(e){
            console.log(e)
        }
    }
    
    return (
    <div>
        <form onSubmit={submit}>
            Search : <input type="text" onChange={searchbar} name = 'search'></input> <br></br>
        </form>

        {(typeof supplements === 'undefined') ? ( <p>loading...</p>) : (
            supplements.map((item, i) =>
                //URL,DSLD ID,Product Name,Brand Name,Bar Code,Net Contents,Serving Size,Product Type [LanguaL],Supplement Form [LanguaL],Date Entered into DSLD,Market Status,Suggested Use
                <p key={i}>{item['DSLD']} {item['Product Name']} {item['Brand Name']}</p>
                
            )
            
        )}
    </div>
    );
};