import dotenv from 'dotenv';
dotenv.config();

import { PinataSDK } from "pinata";
import multer from 'multer';
import FormData from 'form-data';

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.PINATA_GATEWAY,
});

const storage = multer.memoryStorage();
const uploadConfig = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

export const upload = [
    uploadConfig.single('file'),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).send('No file uploaded');
            }

            const file = new File(
                [req.file.buffer],
                req.file.originalname,
                { type: req.file.mimetype }
            );

            const uploadData = await pinata.upload.file(file);
            console.log(uploadData)
            res.send(uploadData);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
];

export const media = async (req, res) => {
    try {
        const cid = req.params.cid;
        const response = await pinata.gateways.get(cid);
        const { data, contentType } = response;

        res.set({
            'Content-Type': contentType,
            'Content-Disposition': `inline; filename="${cid}.${contentType.split('/')[1] || 'bin'}"`,
        });

        if (data instanceof Blob) {
            const buffer = Buffer.from(await data.arrayBuffer());
            res.send(buffer);
        } else if (typeof data === 'string') {
            res.send(data);
        } else if (data) {
            res.send(data);
        } else {
            throw new Error('No data received');
        }
    } catch (error) {
        console.error('Media fetch error:', error);
        res.status(500).send({ error: error.message });
    }
};