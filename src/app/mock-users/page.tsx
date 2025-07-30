import { revalidatePath } from "next/cache";



type MockUsers = {
    id: number;
    name: string
}

export default async function MockUsers() {
    const res = await fetch("https://688982db4c55d5c739528c61.mockapi.io/users")
    const users = await res.json();

    async function addUser(formData: FormData) {
        "use server";
        const name = formData.get("name");
        const res = await fetch("https://688982db4c55d5c739528c61.mockapi.io/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name }),
        });
        const newUser = await res.json();
        revalidatePath("/mock-users")
        console.log(newUser)
    }

    async function deleteUser(formData: FormData){
        "use server";
        const id = formData.get("id");
        
    }



    return (
        <div className="py-10 px-4 max-w-6xl mx-auto">
            <form action={addUser} className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter user name"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                    Add User
                </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {users.map((user: MockUsers) => (
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
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}