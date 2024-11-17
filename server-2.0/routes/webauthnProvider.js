import base64url from "base64url";
import { pinata } from './pinata.js';
import { SessionChallengeStore } from "passport-fido2-webauthn";
import WebAuthnStrategy from "passport-fido2-webauthn";

const Accounts = "0193381e-d522-7a25-8583-6cf375576b83";
const store = new SessionChallengeStore();

export const waStrat = () => {
    return new WebAuthnStrategy({ store: store },
        function verify (id, userHandle, callback) {
            console.log('Verifying:', id, userHandle);

            const encoded_id = base64url.encode(userHandle);
            const cid = base64url.decode(encoded_id);

            const user = pinata.gateways.get(cid);
            console.log('User data:', user);

            callback(null, user, user.publicKey);
        },
        function register(user, id, publicKey, callback) {
            (async () => {
                try {
                    console.log('Registering:', user, id, publicKey);

                    const encoded_id = base64url.encode(user.id);
                    const cid = base64url.decode(encoded_id);

                    const newUser = {
                        name: user.name,
                        keyId: id,
                        publicKey: publicKey
                    }
                    console.log('new user: ', newUser);

                    const { cid: newAccountCid } = await pinata.upload.json(newUser).group(Accounts);

                    await pinata.files.addSwap({
                        cid: cid,
                        swapCid: newAccountCid
                    });

                    const userData = await pinata.gateways.get(cid);
                    console.log('User data:', userData);

                    callback(null, newUser);
                } catch (error) {
                    console.error('Error:', error);
                    callback(error);
                }
            })();
        });
};

export const getChallenge = async (req, res, next) => {
    store.challenge(req, res, (err, challenge) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).send({ error: err.message });
        }

        res.json({ challenge: base64url.encode(challenge) });
    });
};

export const createChallenge = async (req, res, next) => {
    const accountData = await pinata.upload.json({ 
        name: req.body.name,
        keyId: null,
        publicKey: null
    });

    console.log('Account data 1:', accountData);

    const userId = accountData.cid;

    const user = {
        displayName: req.body.name, // just use username for now
        id: userId, // cid?
        name: req.body.name // username
    }

    store.challenge(req, { user: user }, (err, challenge) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).send({ error: err.message });
        }

        user.id = base64url.encode(user.id);
        console.log('User:', user);
        console.log('Challenge:', challenge);

        res.json({ user: user, challenge: base64url.encode(challenge) });
    });
};