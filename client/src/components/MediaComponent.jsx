"use client";

import { useState } from "react";

export function ViewMedia() {
    const [cid, setCid] = useState("");
    const [imageUrl, setImageUrl] = useState('');

    const getMedia = async cid => {
        try {
            const response = await fetch(`/media/${cid}`, { method: "GET" });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
    
            const formData = await response.formData();
            const file = formData.get('file');

            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
        } catch (error) {
            alert("Upload failed:" + error);
            throw error;
        }
    };

    return (
        <div className="w-full flex justify-center h-screen flex flex-col items-center mt-10">
            {imageUrl && (
                <div className="mt-4">
                    <img src={imageUrl} alt="Preview" />
                </div>
            )}
            <form
                className="flex flex-col gap-2 justify-center flex flex-col items-center"
                onSubmit={async e => {
                    e.preventDefault();
                    if (cid) {
                        await getMedia(cid);
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
                        <a href = "/upload" className="text-blue-500">Upload a file</a>
                </div>
            </form>
        </div>
    );
}