import { Navbar } from "flowbite-react";
import { useState } from "react";
import Cookies from 'js-cookie';

export default function NavbarComponent() {
    //checks if the user is logged in by checking the username cookie
    const [loggedIn, setLoggedIn] = useState(Cookies.get("username")?((Cookies.get("username").length < 1)? false: true):false);
    console.log();
    console.log(Cookies.get("username"))
    
    return (
        <Navbar className="w-full bg-slate-800 pt-3 pb-3 fixed top-0" fluid>
            <Navbar.Collapse>
                <Navbar.Link className="text-white" href="/">Home</Navbar.Link>
                <Navbar.Link className="text-white" href="/media">Media</Navbar.Link>
                <Navbar.Link className="text-white" href="/upload">Upload</Navbar.Link>
                <Navbar.Link className="text-white" href="/about">About</Navbar.Link>
                <Navbar.Link className="text-white" href={loggedIn? "/user":"/signin"}>Account</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
