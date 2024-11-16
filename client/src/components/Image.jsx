"use client";

import { useState } from "react";

export function Image() {
    const [cid, setCid] = useState("");
    const [imageUrl, setImageUrl] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    //const  imageCid = (window.location.href).split("/")[2];
    const param = new URLSearchParams(window.location.search);
    const imageCid = param.get('cid');
    console.log(imageCid);
    getMedia(imageCid);
    const getMedia = async cid => {
        try {
            const response = await fetch(`/media/image/${cid}?original=true`, { method: "GET" });
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            setImageUrl(imageUrl);
        } catch (error) {
            alert("Upload failed:" + error);
            throw error;
        }
    };

    return (
        <div className="w-full flex justify-center h-screen flex flex-col items-center mt-10">
            <div>
                {imageUrl && (
                    <div className="mt-4">
                        <img src={imageUrl} alt="Preview" />
                    </div>
                )}
            </div>
        </div>
    );
}