import dotenv from 'dotenv';
dotenv.config();
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.PINATA_GATEWAY,
});

const base64ToFile = async (base64, filename, type) => {
    const res = await fetch(base64);
    const blob = await res.blob();
    return new File([blob], filename, { type });
};

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
        console.log(response);

        const { data, contentType } = response

        const ext = contentType.split('/')[1];

        const image = new File([data], `${cid}.${ext}`, { type: contentType });

        return image;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const upload = async (req, res) => {
    const { base64, filename, filetype } = req.body;
    const file = await base64ToFile(base64, filename, filetype);
    const uploadData = await pinataUpload(file);
    res.send(uploadData);
    return;
};

export const media = async (req, res) => {
    const cid = req.params.cid;
    const image = await pinataGet(cid);
    const imageBase64 = await fileToBase64(image);
    res.send({imageBase64});
    return;
};