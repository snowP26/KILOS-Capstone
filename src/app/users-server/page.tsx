import { resolve } from "path";

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export default async function UsersServer() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json(); // .json() converts JSON data to a js object/array

    return (
        <ul className="space-y-4 p-4">
            {users.map((user: User) => (
                <li key={user.id} className="p-4 bg-white shadow-md rounded-lg text-gray-700 ">
                    <div className="flex justify-between items-center">
                        <span>{user.name} ({user.email})</span>

                    </div>

                </li>
            ))}
        </ul>
    )
}