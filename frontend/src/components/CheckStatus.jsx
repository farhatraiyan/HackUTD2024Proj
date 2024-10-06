import axios from 'axios';
import React, { useEffect, useState } from 'react';

function checkStatus() {
    const [data, setData] = useState("null");

    useEffect(() => {
        getStatus()
    }, []);

    const getStatus = async() =>{
      axios.get('http://127.0.0.1:8101/status')
        .then(response => {
            setData(response.data);
            //console.log(data.status)
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        });
    }
      
    return (
        <div>
            <h1>Current Status</h1>
            {data ? <p>Status: {data.status}</p> : <p>Loading...</p>}
        </div>
    );
}

export default checkStatus;