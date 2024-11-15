import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput } from "flowbite-react";
import Cookies from 'js-cookie';

const server_url = import.meta.env.VITE_SERVER_URL || '';

export default function userPage(e) {
    //sets a cookie called username as the username, used for logging out
    const setUsernameCookie = (username) => {
        Cookies.set("username", username);
    }
    //gets the value of the username cookie
    const username = Cookies.get("username");
    console.log(Cookies.get("username"));

    
    const onClick = async (e) => {
        setUsernameCookie("");
        //changes to the signin page after logging out
        window.location.href = "/signin";
    }

    return (
        <div>
            <div className="flex justify-center h-screen">
                <form onClick={onClick} className="flex w-96 flex-col gap-4 justify-normal">
                    <div>
                        <div className="mb-2 block">
                            <p>{username}</p>
                        </div>
                    </div>
                    <Button>Logout</Button>
                </form>
            </div>
        </div>
    );
};