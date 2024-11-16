"use client";

import { useState, useEffect } from "react";

export function UploadMedia() {
    const [media, setMedia] = useState(null);
    const [preview, setPreview] = useState("");
    const [uploaded, setUploaded] = useState("")

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

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setMedia(file);
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            setUploaded("");
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
        <div className="w-full flex justify-center h-screen flex flex-col items-center mt-10">
            <form
                className="flex flex-col gap-2 w-96"
                onSubmit={async e => {
                    e.preventDefault();
                    if (media) {
                        await uploadMedia(media);
                    }
                    setPreview("");
                    setUploaded("Uploaded!");
                }}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full bg-gray-50 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
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
                <p className="text-lime-500">{uploaded}</p>
                <button
                    type="submit"
                    className="w-24 rounded-full bg-purple-700/10 py-3 font-semibold transition hover:bg-purple-950/20 justify-center"
                    disabled={uploadMedia.isPending}
                >
                    {uploadMedia.isPending ? "Uploading..." : "Submit"}
                </button>
                <div className="flex gap-1">
                        <a href = "/media" className="text-blue-500 ml-7">Back</a>
                </div>
            </form>
        </div>
    );
}