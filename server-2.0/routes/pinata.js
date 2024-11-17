import dotenv from 'dotenv';
dotenv.config();
import { PinataSDK } from "pinata";

export const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.PINATA_GATEWAY,
});