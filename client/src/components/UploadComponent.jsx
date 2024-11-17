"use client";

import { useState, useEffect } from "react";

export function UploadMedia() {
    const [media, setMedia] = useState(null);
    const [preview, setPreview] = useState("");
    const [uploaded, setUploaded] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const uploadMedia = async (media) => {
        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', media);

            const response = await fetch("/media/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error: ${response.status} - ${JSON.stringify(errorData)}`);
            }

            setMedia(null);
            setPreview("");
            setUploaded("Upload successful!");
        } catch (error) {
            alert("Upload failed: " + error);
            throw error;
        } finally {
            setIsUploading(false);
        }
    };

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
        <div className="bg-gradient-to-b from-purple-500 to-purple-300 min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center mb-4 text-purple-700">Upload Media</h1>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={async (e) => {
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
                        className="block w-full p-2 border border-gray-300 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {preview && (
                        <div className="mt-4 flex justify-center">
                            <img
                                src={preview}
                                alt="Preview"
                                className="max-w-full h-48 rounded-lg border border-gray-300"
                            />
                        </div>
                    )}

                    {uploaded && <p className="text-center text-green-600 font-medium mt-2">{uploaded}</p>}

                    <button
                        type="submit"
                        className={`w-full mt-4 py-3 rounded-full text-white font-semibold bg-purple-600 transition hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-300 ${isUploading ? "opacity-70 cursor-not-allowed" : ""}`}
                        disabled={isUploading}
                    >
                        {isUploading ? "Uploading..." : "Submit"}
                    </button>
                    <a href="/media" className="mt-4 text-center text-blue-700 font-semibold hover:underline">Back</a>
                </form>
            </div>
        </div>
    );
}
