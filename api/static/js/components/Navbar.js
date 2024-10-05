class Navbar extends React.Component {
    render() {
        return (
            <nav>
                <ul class="main-nav">
                    <li><a href="/about">About</a></li>
                    <li><a href="/status">Status</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/">Home</a></li>
                </ul>
            </nav>
        );
    }
}