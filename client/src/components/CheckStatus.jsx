import React, { useEffect, useState } from 'react';

const server_url = import.meta.env.VITE_SERVER_URL || '';

function checkStatus() {
    const [data, setData] = useState({ status: 'loading' });

    useEffect(() => {
        getStatus()
    }, []);

    const getStatus = async() =>{
        try {
            const response = await fetch(`${server_url}/status`, { method: 'GET' });

            setTimeout(async () => setData(await response.json()), 1000);
        } catch(err) {
            setData({ status: 'error' });
        }
    }
      
    return (
        <div>
            <h1>Current Status</h1>
            <p>Status: {data.status}</p>
        </div>
    );
}

export default checkStatus;