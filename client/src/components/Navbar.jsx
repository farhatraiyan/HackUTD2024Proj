import { Navbar } from "flowbite-react";

export default function NavbarComponent() {
    return (
        <Navbar className="bg-slate-800 pt-3 pb-3" fluid>
            <Navbar.Collapse>
                <Navbar.Link className="text-white" href="/">Home</Navbar.Link>
                <Navbar.Link className="text-white" href="/create">Create Account</Navbar.Link>
                <Navbar.Link className="text-white" href="/chatbot">Chatbot</Navbar.Link>
                <Navbar.Link className="text-white" href="/about">About</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
