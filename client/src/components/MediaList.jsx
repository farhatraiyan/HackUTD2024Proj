"use client";

import { useState, useLayoutEffect } from "react";

export function PreviewMedia() {
    const [cid, setCid] = useState("");
    const [previewUrls, setPreviewUrls] = useState([]);

    const getPreviews = async () => {
        try {
            const response = await fetch('/media/image', { method: "GET" });
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            
            const imageIds = await response.json();

            alert(JSON.stringify(imageIds));
            
            imageIds.forEach(async imageId => {
                const imageUrl = await getPreview(imageId.preview_id);
                alert(imageUrl);

                setPreviewUrls([
                    ...previewUrls,
                    imageUrl
                ])
            });
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
    

    return (
        <div className="w-full flex justify-center h-screen flex flex-col items-center mt-10">
            {previewUrls && previewUrls.forEach(previewUrl => {
                return (
                    <div className="m-4 w-100 h-100">
                        <a>{previewUrl}</a>
                        <img src={previewUrl} alt="Preview" />
                    </div>
                )
            }
            )}
        </div>
    );
}