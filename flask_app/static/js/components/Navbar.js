class Navbar extends React.Component {
    render() {
        const currentPage = this.props.currentPage;

        return (
            <nav>
                <ul className="main-nav">
                    <li className={currentPage === 'about' ? 'active' : ''}><a href="/about">About</a></li>
                    <li className={currentPage === 'status' ? 'active' : ''}><a href="/status">Status</a></li>
                    <li className={currentPage === 'login' ? 'active' : ''}><a href="/login">Login</a></li>
                    <li className={currentPage === 'home' ? 'active' : ''}><a href="/">Home</a></li>
                </ul>
            </nav>
        );
    }
}