import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import Cookies from 'js-cookie';
import { decode, encode } from '../lib/base64url';
import React, { useState, useEffect } from 'react';

const server_url = import.meta.env.VITE_SERVER_URL || '';

function createAccount(e) {
    const [username, setUsername] = useState("");
    const [refresh, setRefresh] = useState(false);

    const onSubmit = async (e) => {
        if (!window.PublicKeyCredential) {
            alert("WebAuthn is not supported in this browser. Please use a different browser to create an account.");
            return;
        }

        e.preventDefault();

        try {
            const challengeResponse = await fetch(`/webauthn/register`, {
                body: JSON.stringify({ name: username }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            });
    
            if (!challengeResponse.ok) {
                alert("Failed to create account.", JSON.stringify(challengeResponse));
                return;
            }

    
            const challenge = await challengeResponse.json();

            const credential = await navigator.credentials.create({
                publicKey: {
                    authenticatorSelection: {
                        userVerification: 'preferred'
                    },
                    challenge: decode(challenge.challenge),
                    user: {
                        displayName: challenge.user.displayName,
                        id: decode(challenge.user.id),
                        name: challenge.user.name
                    },
                    pubKeyCredParams: [
                        { type: 'public-key', alg: -7 },
                        { type: 'public-key', alg: -257 }
                    ],
                    rp: {
                        name: 'anvilapp',
                    },
                }
            });

            const body = {
                response: {
                    attestationObject: encode(credential.response.attestationObject),
                    clientDataJSON: encode(credential.response.clientDataJSON)
                }
            };
    
            if (credential.response.getTransports) {
                body.response.transports = credential.response.getTransports();
            }

            await fetch(`/signin/passkey`, {
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            });
    
            window.location.href = "/user";
        } catch (error) {
            alert(`Failed to create account: ${error} occured.`);
        }

        // const data = {
        //     username,
        //     password
        // }
        // const url = `${server_url}/signup`;
        // const options = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(data)
        // }

        // const response = await fetch(url, options)

        // if (response.status !== 201 && response.status !== 200) {
        //     const data = await response.json();
        //     alert(data.message);
        //     return;
        // }
        // setUsernameCookie(username)
        // setUsername("")
        // setPassword("")
        // setRefresh(prev => !prev);
        // //redirects to the user page after succesfully creating the account
        // window.location.href = "/user";
    }

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
                    <Button type="submit">Create Account</Button>
                    <div className="flex gap-1">
                        <span>Already have an account?</span>
                        <a href = "/signin" className="text-blue-500">Sign in</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default createAccount;