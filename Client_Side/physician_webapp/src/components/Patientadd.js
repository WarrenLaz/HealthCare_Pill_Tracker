import React from "react";
import { useState } from "react";
import axios from "axios";

export const Patientadd = () => {
    const[Resp, setResp] = useState("");
    const[RegForm, setRegForm] = useState({
            First_Name: "", 
            Last_Name: "",
            Email_Address: "",
            Phone_Number: "",
            Password: ""
    });

    async function AddPatient(token) {
        await axios.post("/physician", {token}).then(resp => {
            console.log(resp);
        })
    }
    
    async function submittion(e) {
        e.preventDefault();
        await axios.post("/patient", {RegForm}).then(resp => {
            console.log(resp);
            AddPatient(resp);
        })
    }

    const inputs = (e) =>{
        setRegForm({...RegForm, [e.target.name] : e.target.value})
    }

    return (
    <div>
        <form onSubmit={submittion}>
            First Name: <input type ="text" onChange ={inputs} name ="First_Name"></input> <br></br>
            Last Name: <input type ="text" onChange ={inputs} name = "Last_Name"></input> <br></br>
            Email Address: <input  type ="text" onChange ={inputs} name = "Email_Address"></input> <br></br>
            Phone Number: <input type ="text" onChange ={inputs} name = "Phone_Number"></input> <br></br>
            Password: <input type ="text" onChange ={inputs} name ="Password"></input> <br></br>
            <button type="submit">Submit</button>
        </form>
    </div> 
    );
};