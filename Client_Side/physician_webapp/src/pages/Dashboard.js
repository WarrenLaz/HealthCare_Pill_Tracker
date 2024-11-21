import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'

export const Dashboard = () => {
    const[Logs, setLogs] = useState([]); 

    useEffect(() => {
        axios.get('http://localhost:8000/logs')
          .then(response => response.data)
          .then(data => setLogs(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);
    console.log(Logs)
    return (
    <div>
        current Logs:
        {(typeof Logs === 'undefined') ? ( <p>loading...</p>) : (
            Logs.map((item, i) =>
                <p key={i}>{item['_id']} {item['medication']} {item['timestamp']}</p>
            )     
        )}
    </div>
    );
};