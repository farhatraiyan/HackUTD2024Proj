const serviceUrl = 'http://127.0.0.1:8101';

describe('Flask API', () => {
    it('GET /accounts should return any empty array before any accounts are posted', async () => {
        const req = {
            method: 'GET'
        }

        const response = await fetch(`${serviceUrl}/accounts`, req);
        const resBody = await response.json();

        console.log(resBody);
    });

    it('POST /accounts will post an account and return it without the password', async () => {
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

    it('/accounts should delete the user3 account', async () => {
        const username = "user3";

        const req = {
            method: 'DELETE'
        }

        const response = await fetch(`${serviceUrl}/accounts/${username}`, req);
        const resBody = await response.json();

        console.log(resBody);
    });
});