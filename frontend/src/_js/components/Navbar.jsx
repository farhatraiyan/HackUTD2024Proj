import React from 'react';

function Navbar() { 
    return (
        <ul>
            <li><a href = "/">Home</a></li>
            <li><a href = "/create/">Create Account</a></li>
            <li><a href = "/status/">Status</a></li>
            <li><a href = "/about/">About</a></li>
        </ul>
    );
}

export default Navbar;