import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'
import useAuth from "../hooks/useAuth";
import { Patientadd } from "../components/Patientadd";

export const Dashboard = () => {
    const {auth} = useAuth();
    return (
    <div>
        <h1>TOKEN: {auth.token}</h1>
        <Patientadd/>
    </div>
    );
};