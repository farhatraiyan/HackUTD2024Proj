import React, { useState, useEffect } from 'react';
import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";

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

        if (response.status !== 200) {
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
        <div>
            <div className="flex justify-center h-screen">
                <form onSubmit={onSubmit} className="flex w-96 flex-col gap-4 justify-center">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Username" value="Username" />
                        </div>
                        <TextInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Password" value="Password" />
                        </div>
                        <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <Button type="submit">Create Account</Button>
                </form>
            </div>
        </div>
    );
};

export default createAccount;