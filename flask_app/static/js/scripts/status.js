function checkStatus() {
    fetch('/api/status')
        .then(response => response.json())
        .then(data => {
            if (data['status'] == 'ok') {
                document.getElementById('status').innerHTML = 'All systems are operational.';
                document.getElementById('status').style.color = 'green';
            } else {
                document.getElementById('status').innerHTML = 'There is an issue with the system. Please try again later.';
                document.getElementById('status').style.color = 'red';
            }
        });
}

ReactDOM.render(<Navbar currentPage={'status'} />, document.getElementById('navbar'));
ReactDOM.render(<StatusDashboard checkStatus={checkStatus} />, document.getElementById('statusDashboard'));