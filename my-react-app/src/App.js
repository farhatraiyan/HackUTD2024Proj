import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/status')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        });
    }, []);

    return (
        <div className="App">
        <header className="App-header">
            <h1>React and Flask</h1>
            {data ? <p>{data.message}</p> : <p>Loading...</p>}
        </header>
        </div>
    );
}

export default App;