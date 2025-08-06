import client from "@/src/api/client";
import { users } from "@/src/app/lib/definitions"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
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

export const logoutUser = async (router: AppRouterInstance) => {

    Swal.fire({
        title: "Log out?",
        text: "Are you sure you want to log out of your account?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log out.",
        showLoaderOnConfirm: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            await client.auth.signOut();

            Swal.fire({
                title: "Logging you out..",
                text: "Redirecting you after logging out...",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            router.push("/login"); 
        }
    });


}
