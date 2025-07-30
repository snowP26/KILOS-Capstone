'use client';

import client from "@/src/api/client";
import { useEffect, useState } from "react";

type u = {
    id: number;
    name: string;
}



export default function MockUsers() {
    
    const fetchUsers = async() =>{
        const data = await getUsers();
        if (data) setUsers(data);
    }
    const [newUser, setNewUser] = useState({ name: "" });
    const [users, setUsers] = useState<u[]>([]);

    const getUsers = async() => {
        const { data, error } = await client.from("user-test").select("*");

        if(error){
            return console.error("Error in retrieving the user: ", error.message);
        }

        return data;
    }

    const deleteUsers = async(id: number) => {
        
        const { error } = await client.from("user-test").delete().eq("id", id);

        if(error){
            return console.error(error);
        }

        console.log("Delete user successful");
        fetchUsers();
    }
    
    const handleSubmit = async(e: any) => {
        e.preventDefault();

        if(newUser.name === ""){
            return console.error("Name should not be empty!")
        }

        const { error } = await client.from("user-test").insert(newUser);

        if(error){
            return console.error("Error in creating the user: ", error.message);
        }

        console.info("Successfully added the user!")
        setNewUser({ name: "" });
        const updatedUsers = await getUsers();
        if (updatedUsers) setUsers(updatedUsers);
    
    }
    useEffect(() => {
        fetchUsers();
    }, []); 

    return (
        <div className="py-10 px-4 max-w-6xl mx-auto">
            <form className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <input
                    type="text"
                    name="name"
                    required
                    onChange={(e) => setNewUser({name: e.target.value})}
                    placeholder="Enter user name"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto"
                />
                <button
                    type="submit"
                    onClick={handleSubmit}
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
                                className="bg-blue-500 text-white rounded-lg px-3 py-1 text-sm hover:bg-blue-600 transition duration-200"
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white rounded-lg px-3 py-1 text-sm hover:bg-red-600 transition duration-200"
                                onClick={() => deleteUsers(user.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            </form>
        </div>
    );
}