import assert from 'assert';
const serviceUrl = 'http://127.0.0.1:8101';

describe('Flask API', () => {
    let postedId;

    it('GET /accounts should return status 404 before any accounts are posted', async () => {
        const req = {
            method: 'GET'
        }

        const response = await fetch(`${serviceUrl}/accounts`, req);
        const resBody = await response.json();

        console.log(resBody);

        assert.strictEqual(response.status, 404);
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

        assert.strictEqual(resBody.username, account.username);
        assert(resBody.password === undefined);
        assert(resBody.id !== undefined);

        postedId = resBody.id;
    });

    it('GET /accounts should now return posted user as part of array', async () => {
        const req = {
            method: 'GET'
        }

        const response = await fetch(`${serviceUrl}/accounts`, req);
        const resBody = await response.json();

        console.log(resBody);

        assert.strictEqual(resBody.length, 1);
        assert.strictEqual(resBody[0].id, postedId);
    });

    it('GET /accounts/:id should return just the posted user', async () => {
        const req = {
            method: 'GET'
        }

        const response = await fetch(`${serviceUrl}/accounts/${postedId}`, req);
        const resBody = await response.json();

        console.log(resBody);

        assert.strictEqual(resBody.id, postedId);
    });

    it('GET /accounts/:username should return just the posted user', async () => {
        const req = {
            method: 'GET'
        }

        const response = await fetch(`${serviceUrl}/accounts/user3`, req);
        const resBody = await response.json();

        console.log(resBody);

        assert.strictEqual(resBody.id, postedId);
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

        assert.strictEqual(response.status, 500);
    });

    it('PUT /accounts/:id should update the account username (and password)', async () => {
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

        assert.strictEqual(resBody.id, postedId);
        assert.strictEqual(resBody.username, account.username);
        assert(resBody.password === undefined);
    });

    it('DELETE /accounts/:id should delete the posted user account', async () => {
        const req = {
            method: 'DELETE'
        }

        const response = await fetch(`${serviceUrl}/accounts/${postedId}`, req);
        const resBody = await response.json();

        console.log(resBody);

        assert.strictEqual(resBody.id, postedId);
    });

    it('DELETE /accounts/:id should fail to delete non-existant account', async () => {
        const req = {
            method: 'DELETE'
        }

        const response = await fetch(`${serviceUrl}/accounts/${postedId}`, req);
        const resBody = await response.json();

        console.log(resBody);

        assert.strictEqual(response.status, 404);
    });
});