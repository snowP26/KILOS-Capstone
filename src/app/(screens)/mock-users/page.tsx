'use client';

import client from "@/src/api/client";
import { useRef, useEffect, useState, FormEvent } from "react";
import { u } from "@/src/app/lib/definitions";

export default function MockUsers() {
    const [newUser, setNewUser] = useState({ name: "" });
    const [newName, setNewName] = useState("");
    const [users, setUsers] = useState<u[]>([]);
    const ref = useRef<HTMLFormElement>(null);

    const getUsers = async () => {
        const { data, error } = await client
            .from("user-test")
            .select("*")
            .order("created_at", { 'ascending': true });

        if (error) {
            return console.error("Error in retrieving the user: ", error.message);
        }

        return data;
    }

    const updateUsers = async () => {
        const updatedUsers = await getUsers();
        if (updatedUsers) setUsers(updatedUsers);
    }

    const putUsers = async (id: number) => {
        const { error } = await client.from("user-test").update({"name": newName}).eq("id", id);
        if (error){
            return console.error("Error updating the user: ", error);
        }
        console.log("Updated user: ", id);
        setNewName("");
                if (ref.current) {
            ref.current.reset();
        }
        updateUsers();
    }

    const deleteUsers = async (id: number) => {

        const { error } = await client.from("user-test").delete().eq("id", id);

        if (error) {
            return console.error("Error deleting user: ", error);
        }

        console.log("Successfully deleted the user.");
        updateUsers();
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { error } = await client.from("user-test").insert(newUser);

        if (error) {
            return console.error("Error in creating the user: ", error.message);
        }

        console.info("Successfully added the user!")
        setNewUser({ name: "" });
        updateUsers();
    }
    
    useEffect(() => {
        updateUsers();
    });

    return (
        <div className="py-10 px-4 max-w-6xl mx-auto">
            <form className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4" ref={ref} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    required
                    onChange={(e) => {
                        const input = e.target.value.trim();
                        if(!input) return console.log("Name should not be empty.");
                        setNewUser({ name: e.target.value })
                    }}
                    
                    placeholder="Enter user name"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto"
                    
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                >
                    Add User
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {users.map((user: u) => (
                        <div key={user.id} className="p-4 bg-gray-900 shadow-md rounded-xl text-white flex flex-col justify-between h-full">
                            <span className="text-lg font-semibold mb-4 break-words">{user.name}</span>
                            <div className="flex justify-end gap-2 mt-auto">
                                
                                <button
                                    type="button"
                                    className="bg-blue-500 text-white rounded-lg px-3 py-1 text-sm hover:bg-blue-600 transition duration-200 cursor-pointer"
                                    onClick={() => putUsers(user.id)}
                                    
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-500 text-white rounded-lg px-3 py-1 text-sm hover:bg-red-600 transition duration-200 cursor-pointer"
                                    onClick={() => deleteUsers(user.id)}
                                >
                                    Delete
                                </button>
                            </div>
                            <input type="text" name="newName" onChange={(e) => setNewName(e.target.value)} className="bg-white w-full mt-5 rounded-md text-black p-1"/>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
}