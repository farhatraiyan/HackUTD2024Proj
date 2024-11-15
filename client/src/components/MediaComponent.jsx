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
            const resBody = await response.json();
            const base64Data = resBody.imageBase64;
            setImageUrl(base64Data);
        } catch (error) {
            alert("Upload failed:" + error);
            throw error;
        }
    };

    return (
        <div className="w-full max-w-xs">
            {imageUrl && (
                <div className="mt-4">
                    <img src={imageUrl} alt="Preview" />
                </div>
            )}
            <form
                className="flex flex-col gap-2"
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
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
                >
                    Find
                </button>
            </form>
        </div>
    );
}