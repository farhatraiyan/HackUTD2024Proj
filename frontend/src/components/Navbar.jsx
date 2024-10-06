import React from 'react';

function Navbar() { 
    return (
        <ul>
            <li><a href = "/">Home</a></li>
            <li><a href = "/src/views/create/">Create Account</a></li>
            <li><a href = "/src/views/status/">Status</a></li>
            <li><a href = "/src/views/about/">About</a></li>
        </ul>
    );
}

export default Navbar;