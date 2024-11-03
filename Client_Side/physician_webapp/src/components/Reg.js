import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'

export const Reg = () => {
    const[Resp, setResp] = useState("");
    const[RegForm, setRegForm] = useState({
            Username: "",
            Password: "",
            First_Name: "", 
            Last_Name: "",
            Date_of_Birth: "" ,
            Practice_Email_Address: "",
            Practice_Phone_Number: "",
            Practic_Address: "",
            Lisence_Number: "",
            License_Expiration_Date: "",
            Organization: "",
            Specialization: ""
    });
    
    async function submittion(e) {
        e.preventDefault();
        await axios.post("http://localhost:8000/Registration", {RegForm}).then(resp => console.log(resp))
    }

    const inputs = (e) =>{
        setRegForm({...RegForm, [e.target.name] : e.target.value})
    }

    return (
    <div>
        <form onSubmit={submittion}>
            Username: <input type ="text" onChange ={inputs} name ="Username"></input> <br></br>
            Password: <input type ="text" onChange ={inputs} name ="Password"></input> <br></br>
            First Name: <input type ="text" onChange ={inputs} name ="First_Name"></input> <br></br>
            Last Name: <input type ="text" onChange ={inputs} name = "Last_Name"></input> <br></br>
            Date of Birth: <input type ="date" onChange ={inputs} name = "Date_of_Birth"></input> <br></br>
            Practice Email Address: <input  type ="text" onChange ={inputs} name = "Practice_Email_Address"></input> <br></br>
            Practice Phone Number: <input type ="text" onChange ={inputs} name = "Practice_Phone_Number"></input> <br></br>
            Practice Address: <input type ="text" onChange ={inputs} name = "Practic_Address"></input> <br></br>
            Lisence Number: <input type ="number" onChange ={inputs} name = "Lisence_Number"></input> <br></br>
            License Expiration Date: <input type ="date" onChange ={inputs} name = "License_Expiration_Date"></input> <br></br>
            Organization: <input type ="text" onChange ={inputs} name = "Organization"></input> <br></br>
            Specialization: <input type ="text" onChange ={inputs} name = "Specialization"></input> <br></br>
            <button type="submit">Submit</button>
        </form>
    </div> 
    );
};