import React from "react";
import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export const Patientadd = () => {
    const {auth} = useAuth();
    const[Resp, setResp] = useState("");
    const[RegForm, setRegForm] = useState({
            Phy_id: auth.token,
            First_Name: "", 
            Last_Name: "",
            Email_Address: "",
            Phone_Number: "",
    });
    
    async function submittion(e) {
        e.preventDefault();
        console.log(RegForm)
        await axios.post("http://localhost:8000/AddPatient", {RegForm}).then(resp => {
            console.log(resp.data);
            setResp(resp.data);
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
            <button type="submit">Submit</button>
        </form>
        {Resp}
    </div> 
    );
};

export default Patientadd;