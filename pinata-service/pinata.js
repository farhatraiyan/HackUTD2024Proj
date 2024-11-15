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

const fileToBase64 = async file => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = buffer.toString('base64');
    return `data:${file.type};base64,${base64String}`;
};

const pinataUpload = async (file) => {
    try {
        const upload = await pinata.upload.file(file);
        console.log(upload);
        return upload;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const pinataGet = async cid => {
    try {
        const response = await pinata.gateways.get(cid);
        console.log('pinata response: ', response);

        return {
            data: response.data,
            contentType: response.contentType
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

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

            const uploadData = await pinataUpload(file);
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

        const ext = contentType.split('/')[1] || 'bin';
        const filename = `${cid}.${ext}`;

        const formData = new FormData();
        const buffer = Buffer.from(await data.arrayBuffer());

        formData.append('file', buffer, {
            filename: filename,
            contentType: contentType
        });

        const headers = formData.getHeaders();

        Object.entries(headers).forEach(([key, value]) => {
            res.header(key, value);
        });

        formData.pipe(res);
    } catch (error) {
        console.error('Media fetch error:', error);
        res.status(500).send({ error: error.message });
    }
};