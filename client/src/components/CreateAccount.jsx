import React, { useState, useEffect } from 'react';

const server_url = import.meta.env.VITE_SERVER_URL || '';

function createAccount(e) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const getAccounts = async () => {
        const url = `${server_url}/accounts`;
        const options = {
            method: "GET"
        }

        const response = await fetch(url, options);

        if(response.status !== 200) {
            alert("Failed to get accounts");
            return;
        }

        const data = await response.json();
        setAccounts(data);
    }
  
    const onSubmit = async (e) => {
        e.preventDefault()
        const data = {
            username,
            password
        }
        const url = `${server_url}/accounts`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)

        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json();
            alert(data.message);
            return;
        }

        setRefresh(prev => !prev);
    }

    useEffect(() => {
        getAccounts();
    }, [refresh]);

    return (
        <form onSubmit={onSubmit}>
            <div>
                <div>
                    {accounts.map((account) => (
                        <p>{account.username} was here</p>
                    ))}
                </div>
                <label htmlFor="Username">Username:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>

                <label htmlFor="Password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <button type="submit">Create Account</button>
        </form>
    );
};

export default createAccount;