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



export const registerUser = async (regData: users, router: AppRouterInstance) => {
    const { email, password, firstName, lastName, regCode } = regData;

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

    const { data: posData, error: posError } = await client.from("positions").select("*").eq("registration_code", regCode);

    if (posError) {
        Swal.close();
        return alert(`Query error: ${posError.message}`);
    }
    
    if (!posData || posData.length <= 0) {
        Swal.close();
        return alert("Code does not exist");
    }

    if(posData[0].assigned_to != null){
        Swal.close();
        return console.log("This registration code has already been used.")
    }

    const { error: yoError } = await client
        .from("youth_official")
        .insert([
            {
                email: email,
                firstname: firstName,
                lastname: lastName,
                position: posData[0].position_name,
                role: posData[0].user_type
            }
        ]);

    await client.from("positions").insert([])

    if(yoError) {
        Swal.close();
        return alert(`Registration error: ${yoError}`)
    }
    const { error } = await client.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
                position: posData[0].position_name,
                role: posData[0].user_type
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
        return console.log("error: ", error);
    }
    router.push("/login")
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
