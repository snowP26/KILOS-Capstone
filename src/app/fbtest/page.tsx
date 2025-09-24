"use client";

import { useState } from "react";

export default function FacebookPoster() {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Posting...");

        try {
            const res = await fetch("/api/fbpost", {  
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            const data = await res.json();

            if (data.id) {
                setStatus("✅ Successfully posted to Facebook!");
            } else {
                setStatus("❌ Failed to post: " + JSON.stringify(data));
            }
        } catch (err) {
            console.error(err);
            setStatus("⚠️ Error posting message.");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-2">Post to Facebook Page</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your post..."
                    className="border p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Post
                </button>
            </form>
            {status && <p className="mt-2">{status}</p>}
        </div>
    );
}
