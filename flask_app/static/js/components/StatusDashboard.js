class StatusDashboard extends React.Component {
    render() {
        this.props.checkStatus();

        return (
            <div>
                <h1>Status Dashboard</h1>
                <p id='status'>Loading Status...</p>
            </div>
        );
    }
}