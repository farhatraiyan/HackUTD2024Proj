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

    const onSubmit = async (e) => {
        e.preventDefault()
        //verification for account sign in
        const data = {
            username,
            password
        }
        setUsername("");
        setPassword("");

        const url = `${server_url}/login`;
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
        console.log(Cookies.get("username"))
        //e.target.reset();
        
        //redirects to the user page after succesfully logging into the account
        window.location.href = "/user";
    }

    useEffect(() => {
        //getAccounts();
    }, [refresh]);

    return (
        <div>
            <div className="bg-gradient-to-b from-purple-500 to-purple-300 flex justify-center h-screen">
                <form onSubmit={onSubmit} className="flex w-96 font-bold flex-col gap-4 justify-center">
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
                    <Button type="submit">Sign In</Button>
                    <div className="flex gap-1">
                        <span>Don't have an account yet?</span>
                        <a href = "/create" className="text-blue-700 font-bold">Create Account</a>
                    </div>
                </form>
            </div>
        </div>
    );
};