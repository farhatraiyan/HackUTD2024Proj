const serviceUrl = 'http://127.0.0.1:8101';

describe('Flask API', () => {
    let postedId;

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
        postedId = resBody.id;
    });

    it('GET /accounts should now return posted user', async () => {
        const req = {
            method: 'GET'
        }

        const response = await fetch(`${serviceUrl}/accounts`, req);
        const resBody = await response.json();

        console.log(resBody);
    });

    it('POST /accounts should fail to post account with same username', async () => {
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

    it('PUT /accounts should update the account username (and password)', async () => {
        const account = {
            username: 'user4',
            password: 'pass2'
        }

        const req = {
            method: 'PUT',
            body: JSON.stringify(account),
            headers: { 'Content-Type': 'application/json' }
        }

        const response = await fetch(`${serviceUrl}/accounts/${postedId}`, req);
        const resBody = await response.json();
        console.log(resBody);
    });

    it('DELETE /accounts should delete the posted user account', async () => {
        const req = {
            method: 'DELETE'
        }

        const response = await fetch(`${serviceUrl}/accounts/${postedId}`, req);
        const resBody = await response.json();

        console.log(resBody);
    });

    it('DELETE /accounts should fail to delete non-existant account', async () => {
        const req = {
            method: 'DELETE'
        }

        const response = await fetch(`${serviceUrl}/accounts/${postedId}`, req);
        const resBody = await response.json();

        console.log(resBody);
    });
});