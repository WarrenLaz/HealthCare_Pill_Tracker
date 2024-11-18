import React from "react";
import { useState } from "react";
import axios from 'axios'

export const PhyDash = () => {
    const[supplements, setsupplements] = useState([]); 
    const[search, setsearch] = useState({});

    const searchbar = (event) =>{
        setsearch(event.target.value);
    }

    async function submit(e){
        e.preventDefault();
        console.log(search);
        try{
            await axios.post("/drugs", {search}).then(resp => {setsupplements(resp.data)})
        }catch(e){
            console.log(e)
        }
    }
    
    return (
    <div>

    </div>
    );
};