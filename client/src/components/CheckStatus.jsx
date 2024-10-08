import React, { useEffect, useState } from 'react';

function checkStatus() {
    const [data, setData] = useState({ status: 'loading' });

    useEffect(() => {
        getStatus()
    }, []);

    const getStatus = async() =>{
        try {
            const response = await fetch('/status', { method: 'GET' });

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