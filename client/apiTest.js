import assert from 'assert';
const serviceUrl = 'http://127.0.0.1:8101';

describe('Flask API', () => {
    let postedId;

    it.only('test login', async () => {
        const res = await fetch(`${serviceUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'user',
                password: 'pass'
            })
        });

        const resBody = await res.json();
        console.log(resBody);
    });

    it.only('test signup', async () => {
        const res = await fetch(`${serviceUrl}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'user',
                password: 'pass'
            })
        });

        const resBody = await res.json();
        console.log(resBody);
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

        assert.strictEqual(response.status, 500);
    });
});