const serviceUrl = 'http://127.0.0.1:8101';

describe('Flask App Auth Tests', () => {
    let loginToken;

    it('test signup', async () => {
        const res = await fetch(`${serviceUrl}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'user',
                password: 'pass'
            })
        });

        const resBody = await res.json();
        loginToken = res.headers.get('set-cookie');
        console.log(resBody);
        console.log(res.headers);
    });

    it('test logout', async () => {
        const res = await fetch(`${serviceUrl}/logout`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Cookie': loginToken
        }
        });

        const resBody = await res.json();
        console.log(resBody);
        loginToken = null;
    });
    
    it('test login', async () => {
        const res = await fetch(`${serviceUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'user',
                password: 'pass'
            })
        });

        const resBody = await res.json();
        loginToken = res.headers.get('set-cookie');
        console.log(resBody);
    });

    it('PUT /accounts should update user account', async () => {
        const account = {
            username: 'user4',
            password: 'pass2'
        }

        const req = {
            method: 'PUT',
            body: JSON.stringify(account),
            headers: {
                'Content-Type': 'application/json',
                'Cookie': loginToken
            }
        }

        const response = await fetch(`${serviceUrl}/accounts`, req);
        const resBody = await response.json();

        console.log(resBody);
    });

    it('DELETE /accounts should delete the posted user account', async () => {
        const req = {
            method: 'DELETE',
            headers: {
                'Cookie': loginToken
            }
        }

        const response = await fetch(`${serviceUrl}/accounts`, req);
        const resBody = await response.json();

        console.log(resBody);
    });
});