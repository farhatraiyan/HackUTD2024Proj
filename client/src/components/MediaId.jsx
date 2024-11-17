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
        <div className="bg-purple-200 flex justify-center flex-col items-center mt-10 min-h-screen">
            <div>
                {imageUrl && (
                    <div className="outline outline-4 m-10">
                        <img src={imageUrl} alt="Preview" />
                    </div>
                )}
            </div>
            <a href = {`/upload`} className="text-blue-700 font-bold my-5">Update This Image</a>
        </div>
    );
}