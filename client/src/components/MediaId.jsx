"use client";

import { useState, useLayoutEffect } from "react";

export function MediaId() {
    const [cid, setCid] = useState("");
    const [imageUrl, setImageUrl] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    //const  imageCid = (window.location.href).split("/")[2];
    //const param = new URLSearchParams(window.location.search);
    const imageCid = (window.location.href).split("/")[4];
    console.log(imageCid);
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
    
    useLayoutEffect(()=>getMedia(imageCid), []);
    
//TODO: Add update button to update the image
    return (
        <div className="w-full flex justify-center h-screen flex-col items-center mt-10">
            <p>IMAGE:</p>
            <div>
                {imageUrl && (
                    <div className="mt-4">
                        <img src={imageUrl} alt="Preview" />
                    </div>
                )}
            </div>
            <a href = "/upload" className="text-blue-500">Update This Image</a>
        </div>
    );
}