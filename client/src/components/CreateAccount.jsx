import React, { useState, useEffect } from 'react';
import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import Cookies from 'js-cookie';

const server_url = import.meta.env.VITE_SERVER_URL || '';

function createAccount(e) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [refresh, setRefresh] = useState(false);

    //sets a cookie called username as the username
    const setUsernameCookie = (username) => {
        Cookies.set("username", username);
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const data = {
            username,
            password
        }
        const url = `${server_url}/signup`;
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
        setUsernameCookie(username)
        setUsername("")
        setPassword("")
        setRefresh(prev => !prev);
        //redirects to the user page after succesfully creating the account
        window.location.href = "/user";
    }

    useEffect(() => {
        //getAccounts();
    }, [refresh]);

    return (
        <div>
            <div className="bg-purple-500 flex justify-center h-screen">
                <form onSubmit={onSubmit} className="flex w-96 flex-col gap-4 justify-center">
                    <div>
                        <div className="mb-2 block">
                            <Label className ="font-bold" htmlFor="Username" value="Username" />
                        </div>
                        <TextInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label className ="font-bold" htmlFor="Password" value="Password" />
                        </div>
                        <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <Button type="submit">Create Account</Button>
                    <div className="flex gap-1 font-bold">
                        <span>Already have an account?</span>
                        <a href = "/signin" className="text-blue-700">Sign in</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default createAccount;