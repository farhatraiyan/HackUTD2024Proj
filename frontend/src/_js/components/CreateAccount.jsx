import React, { useState } from 'react';

function createAccount(e) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const onSubmit = async (e) => {
        e.preventDefault()
        const data = {
            username,
            password
        }
        const url = "http://127.0.0.1:8101/accounts"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if(response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        }else{
            //succesful
        }
    }

    return <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="Username">Username:</label>
            <input type = "text" id = "username" value = {username} onChange = {(e) => setUsername(e.target.value)}></input>

            <label htmlFor="Password">Password:</label>
            <input type = "text" id = "password" value = {password} onChange = {(e) => setPassword(e.target.value)}></input>
        </div>
        <button type = "submit">Create Account</button>
    </form>
};

export default createAccount;