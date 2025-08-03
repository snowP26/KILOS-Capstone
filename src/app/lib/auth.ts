import client from "@/src/api/client";
import { users } from "./definitions";
import Swal from 'sweetalert2';

const successPopup = async () => {
    await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Check your email for confirmation.",
        timer: 2000,
        showConfirmButton: false,
    })
}

export const registerUser = async (data: users) => {
    const { email, password, firstName, lastName, regCode } = data;
    Swal.fire({
        title: "Signing you up...",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    const { error } = await client.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
                registration_code: regCode,
            },
            emailRedirectTo: 'http://localhost:3000/login' // replace with deployed url.
        }
    });

    Swal.close();
    if (error) {
        await Swal.fire({
            icon: "error",
            title: "Registration failed: ",
            text: error.message,
        });
        return;
    }

    return successPopup();

}
