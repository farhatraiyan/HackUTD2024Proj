"use client";

import { useState } from "react";

export function ViewMedia() {
    const [cid, setCid] = useState("");
    const [imageUrl, setImageUrl] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');

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

    const getPreview = async cid => {
        try {
            const response = await fetch(`/media/image/${cid}`, { method: "GET" });
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            setPreviewUrl(imageUrl);
        } catch (error) {
            alert("Upload failed:" + error);
            throw error;
        }
    };

    return (
        <div className="bg-purple-500 w-full flex justify-center h-screen flex-col items-center mt-10">
            <div>
                {imageUrl && (
                    <div className="mt-4">
                        <img src={imageUrl} alt="Preview" />
                    </div>
                )}
            </div>
            <div>
                {previewUrl && (
                    <div className="mt-4">
                        <img src={previewUrl} alt="Preview" />
                    </div>
                )}
            </div>
            <form
                className="bg-purple-500 flex flex-col gap-2 justify-center items-center"
                onSubmit={async e => {
                    e.preventDefault();
                    if (cid) {
                        await Promise.all([
                            getMedia(cid),
                            getPreview(cid)
                        ]);
                    }
                }}
            >
                <input
                    type="text"
                    placeholder="CID"
                    className="w-full rounded-full px-4 py-2 text-black"
                    onChange={(e) => setCid(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-24 rounded-full bg-purple-700/10 py-3 font-semibold transition hover:bg-black/20 justify-center"
                >
                    Find
                </button>
                <div className="flex gap-1">
                        <a href = "/upload" className="text-blue-700 font-bold">Upload a file</a>
                </div>
            </form>
        </div>
    );
}