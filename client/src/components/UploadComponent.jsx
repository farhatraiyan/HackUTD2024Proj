"use client";

import { useState, useEffect } from "react";

export function UploadMedia() {
    const [media, setMedia] = useState(null);
    const [preview, setPreview] = useState("");

    const uploadMedia = async media => {
        try {
            const formData = new FormData();
            formData.append('file', media);
    
            const response = await fetch("/upload", {
                method: "POST",
                body: formData
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error: ${response.status} - ${JSON.stringify(errorData)}`);
            }

            alert(response.json());
            return;
        } catch (error) {
            alert("Upload failed:" + error);
            throw error;
        }
    }

    const fileToBase64 = file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setMedia(file);
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return (
        <form
            className="flex flex-col gap-2 w-96"
            onSubmit={async e => {
                e.preventDefault();
                if (media) {
                    await uploadMedia(media);
                }
            }}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full rounded-full px-4 py-2 text-white"
            />
            {preview && (
                <div className="mt-4">
                    <img
                        src={preview}
                        alt="Preview"
                        className="max-w-full h-auto rounded-lg"
                    />
                </div>
            )}
            <button
                type="submit"
                className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
                disabled={uploadMedia.isPending}
            >
                {uploadMedia.isPending ? "Uploading..." : "Submit"}
            </button>
        </form>
    );
}