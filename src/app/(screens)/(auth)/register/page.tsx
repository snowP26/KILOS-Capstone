'use client';

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { registerUser } from "@/src/app/actions/auth";

export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPass: "",
        regCode: ""
    });
    const router = useRouter();

    const clearFields = () => {
        setFormData({
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPass: "",
            regCode: ""
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(formData.password !== formData.confirmPass){
            return alert("Passwords must match!");
        }
        await registerUser(formData);
        router.push("/login")
        return clearFields();
    } 

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-6 bg-white rounded-xl shadow-md space-y-4"
            >
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Register</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    name="confirmPass"
                    placeholder="Confirm Password"
                    value={formData.confirmPass}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="regCode"
                    placeholder="Registration Code"
                    value={formData.regCode}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
