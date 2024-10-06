import React from 'react';

function Navbar() { 
    return (
        <ul>
            <li><a href = "/">Home</a></li>
            <li><a href = "/src/create/">Create Account</a></li>
            <li><a href = "/src/status/">Status</a></li>
            <li><a href = "/src/about/">About</a></li>
        </ul>
    );
}

export default Navbar;