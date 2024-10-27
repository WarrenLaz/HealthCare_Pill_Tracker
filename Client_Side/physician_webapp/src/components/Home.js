import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'

export const Home = () => {
    const[supplements, setsupplements] = useState([]);
    const[search, setsearch] = useState([]);
    useEffect(()=>{
        fetch("/drugs").then(
            res => res.json()
        ).then(
            data =>{
                setsupplements(data);
            }
        )
    }, []);
    const searchbar = (event) =>{
        setsearch(event.target.value);
    }

    async function submit(e){
        try{
            await axios.post("http://localhost:8000",{search})
        }catch(e){
            console.log(e)
        }
    }
    
    return (
    <div>
        <form onSubmit={submit}>
            Search : <input type="text" onChange={searchbar} name = 'search'></input> <br></br>
        </form>
        {(typeof search === 'undefined') ? (<p>none</p>) : <p>{search}</p>}
        {(typeof supplements === 'undefined') ? ( <p>loading...</p>) : (
            supplements.map((item, i) =>
                <p key={i}>{item['Strength']}</p>
            )
            
        )}
    </div>
    );
};