import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'

export const DrugSearch = () => {
    const[supplements, setsupplements] = useState([]);
    const[search, setsearch] = useState([]);

    const searchbar = (event) =>{
        setsearch(event.target.value);
    }

    async function submit(e){
        e.preventDefault();
        console.log(search);
        try{
            await axios.post("http://141.215.218.255:8000//drugs", {search}).then(resp => {setsupplements(resp.data)})
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
                <p key={i}>{item['DrugName']} {item['Strength']} {item['Form']}</p>
                
            )
            
        )}
    </div>
    );
};