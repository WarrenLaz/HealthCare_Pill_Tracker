import React from "react";
import { useState } from "react";
import axios from 'axios'

export const NewPatient = () => {
    const[Resp, setResp] = useState("");
    const[RegForm, setRegForm] = useState({
            Password: "",
            First_Name: "", 
            Last_Name: "",
            Date_of_Birth: "" ,
            Email_Address: "",
            Phone_Number: "",
            Address: ""
    });
    
    async function submittion(e) {
        e.preventDefault();
        await axios.post("/patient", {RegForm}).then(resp => console.log(resp))
    }

    const inputs = (e) =>{
        setRegForm({...RegForm, [e.target.name] : e.target.value})
    }

    return (
    <div>
        <form onSubmit={submittion}>
            Password: <input type ="text" onChange ={inputs} name ="Password"></input> <br></br>
            First Name: <input type ="text" onChange ={inputs} name ="First_Name"></input> <br></br>
            Last Name: <input type ="text" onChange ={inputs} name = "Last_Name"></input> <br></br>
            Date of Birth: <input type ="date" onChange ={inputs} name = "Date_of_Birth"></input> <br></br>
            Email Address: <input  type ="text" onChange ={inputs} name = "Email_Address"></input> <br></br>
            Phone Number: <input type ="text" onChange ={inputs} name = "Phone_Number"></input> <br></br>
            Address: <input type ="text" onChange ={inputs} name = "Address"></input> <br></br>
            <button type="submit">Submit</button>
        </form>
    </div> 
    );
};