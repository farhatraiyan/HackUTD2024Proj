const serviceUrl = 'http://127.0.0.1:8101';

describe('Flask API', () => {
    it('/status should return some message', async () => {
        const req = {
            method: 'GET'
        }

        const response = await fetch(`${serviceUrl}/accounts`, req);
        const resBody = await response.json();

        console.log(resBody);
    });
    it('/accounts should return some message', async () => {
        const account = {
            username: 'user3',
            password: 'pass'
        }

        const req = {
            method: 'POST',
            body: JSON.stringify(account),
            headers: { 'Content-Type': 'application/json' }
        }

        const response = await fetch(`${serviceUrl}/accounts`, req);
        const resBody = await response.json();
        console.log(resBody);
    });
});