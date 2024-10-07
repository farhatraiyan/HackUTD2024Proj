import React, { useEffect, useState } from 'react';

function checkStatus() {
    const [data, setData] = useState({ status: 'loading' });

    useEffect(() => {
        getStatus()
    }, []);

    const getStatus = async() =>{
        const response = await fetch('http://127.0.0.1:8101/status', { method: 'GET' });

        setTimeout(async () => setData(await response.json()), 1000);
    }
      
    return (
        <div>
            <h1>Current Status</h1>
            <p>Status: {data.status}</p>
        </div>
    );
}

export default checkStatus;