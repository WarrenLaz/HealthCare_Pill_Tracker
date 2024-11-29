import React from "react";
import { useState } from "react";
import axios from 'axios';

export const Searchsup = () => {
    const[supplements, setsupplements] = useState([]);
    const[search, setsearch] = useState([]);

    const searchbar = (event) =>{
        setsearch(event.target.value);
    }

    async function submittion(e){
        e.preventDefault();
        console.log(search);
        try{
            await axios.post("/supple", {search}).then(resp => {setsupplements(resp.data)})
        }catch(e){
            console.log(e)
        }
    }
    //Select supplement -> {list of supplements [id]} -> select the supplement -> maps supplement with 
    //prescription through id. e.g. {medid, prescriptionstuff}
    return (
    <div>
        <h1>Supplement Search</h1>
        <form onSubmit={submittion}>
            Search : <input type="text" onChange={searchbar} name = 'search'></input> <br></br>
        </form>

        <h1>Supplement Information</h1>
        <form onSubmit={submittion}>
            Note: <input type ="text" name="Note"></input><br></br>
            Start Date: <input type ="date"  name = "Start"></input> <br></br>
            Quantity: <input  type ="number" name = "Qunatity"></input> <br></br>
            Dosage: <input type ="number"  name = "Phone_Number"></input> <br></br>
            Units: <select name ="Password">
                <option value="mg">mg</option>
                <option value="g">g</option>
                <option value="ug">ug</option>
                <option value="ng">ng</option>
                <option value="kg">kg</option>
                <option value="ml">L</option>
                <option value="ml">ul</option>
                <option value="cc">cc</option>
                <option value="fl">oz</option>
                </select> <br></br>
            <button type="submit">Submit</button>
        </form>
        <h1>Schedule</h1>
        <form>
            Monday: <input type ="time"  name ="Note"></input> <br></br>
            Tuesday: <input type ="time"  name ="Note"></input> <br></br>
            Thursday: <input type ="time" name ="Note"></input> <br></br>
            Friday: <input type ="time" name ="Note"></input> <br></br>
            Saturday: <input type ="time"  name ="Note"></input> <br></br>
            Sunday: <input type ="time"  name ="Note"></input> <br></br>
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