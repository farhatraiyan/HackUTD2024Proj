import dotenv from 'dotenv';
dotenv.config();

import { PinataSDK } from "pinata";
import multer from 'multer';
import sharp from 'sharp';

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.PINATA_GATEWAY,
});

const ImageSets = "019337aa-ef67-774d-97ff-87536a1fc441";
const OriginalImages = "019337ad-e246-7433-962f-498a54b6812a";
const PreviewImages = "019337ae-1302-7a94-acb6-31a0614cb173";

/*
    uploadData: {
        id: file id. used to get info, update, delete,
        name: file name with extension,
        cid: file hash,
        size: size in bytes,
        number_of_files: number of files (should be usually 1 for us),
        mime_type: "text/plain", mime type of the file,
        user_id: "7a484d2c-4219-4f80-9d9d-86b42461e71a", api key user id
        group_id: null file group (original, masked, preview, etc)
    }

    use .addMetaDate({
        e.g. type: 'preview'
    }) with upload.file for filter
    use .group("string") with upload.file for grouping
*/

const storage = multer.memoryStorage();
const uploadConfig = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

const compressImage = async (buffer, maxWidth = 800, quality = 80) => {
    try {
        const image = sharp(buffer);
        const metadata = await image.metadata();

        const width = Math.min(maxWidth, metadata.width);
        const height = Math.round((metadata.height * width) / metadata.width);

        return await image
            .resize(width, height, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({ quality })
            .toBuffer();
    } catch (error) {
        throw new Error(`Image compression failed: ${error.message}`);
    }
}

export const getImage = async (req, res) => {
    try {
        const cid = req.params.id;
        const response = await pinata.gateways.get(cid);
        const { data, contentType } = response;
        console.log(response);

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

export const uploadImage = [
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
            const ogImageData = await pinata.upload.file(file).group(OriginalImages);
            const ogImageId = ogImageData.id;
            console.log(ogImageData);

            const compressedBuffer = await compressImage(req.file.buffer);
            const compressedFile = new File(
                [compressedBuffer],
                req.file.originalname,
                { type: req.file.mimetype }
            );
            const previewImageData = await pinata.upload.file(compressedFile).group(PreviewImages);
            const previewImageId = previewImageData.id;
            console.log(previewImageData);

            const imageSet = {
                ogImageId,
                previewImageId
            }

            const uploadImageSetData = await pinata.upload.json(imageSet).group(ImageSets);
            console.log(uploadImageSetData);

            res.sendStatus(200);
        } catch (error) {
            console.error('Media upload error:', error);
            res.status(500).send(error.message);
        }
    }
];