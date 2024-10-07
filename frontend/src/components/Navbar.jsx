import React from 'react';

function Navbar() { 
    return (
        <ul>
            <li><a href = "/views/home/">Home</a></li>
            <li><a href = "/views/create/">Create Account</a></li>
            <li><a href = "/views/status/">Status</a></li>
            <li><a href = "/views/about/">About</a></li>
        </ul>
    );
}

export default Navbar;