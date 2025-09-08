"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProjectForm() {
    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
            <form className="space-y-4">
                <Input
                    type="text"
                    placeholder="Project Title"
                    required
                />

                <Textarea
                    placeholder="Project Description"
                    required
                />

                <Input
                    type="file"
                    accept="image/*"
                    required
                />

                <Button type="submit" className="w-full">
                    Submit Project
                </Button>
            </form>
        </div>
    );
}
