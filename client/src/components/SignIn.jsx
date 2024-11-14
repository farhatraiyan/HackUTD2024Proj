import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput } from "flowbite-react";
import Cookies from 'js-cookie';


const server_url = import.meta.env.VITE_SERVER_URL || '';

export default function signIn(e) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [refresh, setRefresh] = useState(false);

    //sets a cookie called username as the username
    const setUsernameCookie = (username) => {
        Cookies.set("username", username);
    }
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
        //#todo make verification for account sign in
        setUsernameCookie(username)
        //console.log(Cookies.get("username"))
        //e.target.reset();
        setUsername("");
        setPassword("");
        //redirects to the user page after succesfully logging into the account
        window.location.href = "/user";
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