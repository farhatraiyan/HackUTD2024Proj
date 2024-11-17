"use client";

import { useState, useLayoutEffect } from "react";
import { Button } from "flowbite-react";

export function PreviewMedia() {
    const [cid, setCid] = useState("");
    const [previewUrls, setPreviewUrls] = useState([]);
    const [previewIds, setPreviewIds] = useState([]);

    const getPreviews = async () => {
        try {
            const response = await fetch('/media/image', { method: "GET" });
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            
            const imageIds = await response.json();
            
            const urls = await Promise.all(imageIds.map(imageId => getPreview(imageId)));

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
    
      // TODO: Add an upload button to redirect to the upload page.
      return (
        <div className="bg-purple-200 min-h-screen p-8 mt-10">
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-8 justify-items-center">
                    {previewUrls && previewUrls.map((previewUrl, index) => (
                        <div key={index} className="w-96 h-96 flex items-center justify-center p-2">
                            <a href={`/media/${previewIds[index]}`} className="w-full h-full flex items-center justify-center">
                                <img 
                                    className="max-w-full max-h-full object-contain outline outline-4" 
                                    src={previewUrl} 
                                    alt={`Preview ${index}`} 
                                />
                            </a>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8">    
                    <Button className="mt-8 w-72 bg-slate-800" href="/upload">Upload</Button>
                </div>
            </div>
        </div>
    );
}