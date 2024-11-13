import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput } from "flowbite-react";

const server_url = import.meta.env.VITE_SERVER_URL || '';

export default function signIn(e) {
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
        e.target.reset();
        e.preventDefault();
        setUsername("")
        setPassword("")
    }

    useEffect(() => {
        //getAccounts();
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
                    <Button type="submit">Sign In</Button>
                    <div className="flex gap-1">
                        <span>Don't have an account yet?</span>
                        <a href = "/create" className="text-blue-500">Create Account</a>
                    </div>
                </form>
            </div>
        </div>
    );
};