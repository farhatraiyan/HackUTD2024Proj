"use client";

import { useState } from "react";

export function ViewMedia() {
    const [cid, setCid] = useState("");
    const [imageUrl, setImageUrl] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');

    const getMedia = async cid => {
        try {
            const response = await fetch(`/media/${cid}?original=true`, { method: "GET" });
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
            const response = await fetch(`/media/${cid}?original=false`, { method: "GET" });
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
        <div className="w-full max-w-xs">
            <div className=" outline-dashed">
                {imageUrl && (
                    <div className="mt-4">
                        <img src={imageUrl} alt="Preview" />
                    </div>
                )}
            </div>
            <div className="outline-double">
                {previewUrl && (
                    <div className="mt-4">
                        <img src={previewUrl} alt="Preview" />
                    </div>
                )}
            </div>
            <form
                className="flex flex-col gap-2"
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
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
                >
                    Find
                </button>
            </form>
        </div>
    );
}