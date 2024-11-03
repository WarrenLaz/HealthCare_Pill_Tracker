import React from "react";
import { useState } from "react";
import axios from 'axios'

export const Login = () => {
    const[Resp, setResp] = useState("waiting");
    const[LoginForm, setLoginForm] = useState({
        Username : "",
        Password : ""
    });

    const handle = (e) =>{
        setLoginForm({...LoginForm,[e.target.name] : e.target.value})
    }

    async function submittion(e) {
        e.preventDefault();
        axios.post("http://localhost:8000/Login", {LoginForm}).then(resp => {setResp(resp.data)});
    }
    
    return (
    <div>
        <form onSubmit={submittion}>
            Username: <input onChange={handle} name = "Username"></input> <br></br>
            Password: <input onChange={handle} name = "Password"></input> <br></br>
            <button type="submit">Submit</button>
        </form>
        <p>{Resp}</p>
    </div>
    );
};