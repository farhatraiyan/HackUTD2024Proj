"use client";

import { useState, useLayoutEffect } from "react";

export function PreviewMedia() {
    const [cid, setCid] = useState("");
    const [previewUrls, setPreviewUrls] = useState([]);
    const [previewIds, setPreviewIds] = useState([]);

    const getPreviews = async () => {
        try {
            const response = await fetch('/media/image', { method: "GET" });
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            
            const imageIds = await response.json();
            
            const urls = await Promise.all(
                imageIds.map(imageId => getPreview(imageId.preview_id))
            );
            setPreviewUrls(urls);
            setPreviewIds(imageIds);
        } catch {

        }
    }

    const getPreview = async cid => {
        try {
            const response = await fetch(`/media/image/${cid}`, { method: "GET" });
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            return imageUrl;
        } catch (error) {
            alert("Upload failed:" + error);
            throw error;
        }
    };

    useLayoutEffect(() => {
        getPreviews();
      }, []);
    
      //todo: a 3x preview grid, all fit in a page
      return (
        <div className="w-full grid grid-cols-3 justify-center h-screen items-center mt-10">
            {previewUrls && previewUrls.map((previewUrl, index) => (
                <div key={index} className="m-4 w-48 h-48 cursor-pointer" href={`/media/${previewIds[index].preview_id}`}>
                    <img className="object-contain" src={previewUrl} alt={`Preview ${index}`} 
                    />
                </div>
            ))}
        </div>
    );
}