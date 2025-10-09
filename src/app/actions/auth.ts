import client from "@/src/api/client";
import { users } from "@/src/app/lib/definitions";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FormEvent } from "react";
import Swal from "sweetalert2";

const successPopup = async () => {
  await Swal.fire({
    icon: "success",
    title: "Success!",
    text: "Check your email for confirmation.",
    timer: 2000,
    showConfirmButton: false,
  });
};


export const getCodeData = async (code: string) => {
  const { data, error } = await client.from("positions").select("*").eq("registration_code", code).single();

  if (error) {
    console.log("Error fetching code data: ", error);
    return null;
  }

  if (data) {
    console.log("Successfully fetched registration code data.");
    return data.role;
  }
}

// create code checker
export const checkCode = async (code: string) => {
  const { data, error } = await client
    .from("positions")
    .select("*")
    .eq("registration_code", code);

  if (error) {
    return console.log("Registration code error: ", error);
  }
  if (data) {
    return data[0]
  }
};


export const registerUser = async (
  regData: users,
  router: AppRouterInstance,
  clearFields: () => void
) => {
  const { email, password, firstName, lastName, regCode } = regData;
  const userType = await checkCode(regCode);

  Swal.fire({
    title: "Signing you up...",
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const { data: posData, error: posError } = await client
    .from("positions")
    .select("*")
    .eq("registration_code", regCode);

  if (posError) {
    Swal.close();
    return alert(`Query error: ${posError.message}`);
  }

  if (!posData || posData.length <= 0) {
    Swal.close();
    return alert("Code does not exist");
  }

  if (posData[0].assigned_to != null) {
    Swal.close();
    return console.log("This registration code has already been used.");
  }
  const { error: yoError } = await client.from("youth_official").insert([
    {
      email: email,
      firstname: firstName,
      lastname: lastName,
      position: posData[0].position,
      role: posData[0].role,
      location: posData[0].location,
    },
  ]);

  if (yoError) {
    Swal.close();
    return alert(`Registration error: ${yoError.message}`);
  }
  const { error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        position: posData[0].position,
        role: posData[0].role,
        location: posData[0].location,
      },
      emailRedirectTo: "https://kilos-capstone.vercel.app/",
    },

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
  router.push("/login");
  clearFields();
  return successPopup();
};

export const logoutUser = async (router: AppRouterInstance) => {
  Swal.fire({
    title: "Log out?",
    text: "Are you sure you want to log out of your account?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log out.",
    showLoaderOnConfirm: true,
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
};


const getRole = async () => {
  const { data: { user } } = await client.auth.getUser();

  if (user) {
    return user.user_metadata.role as string
  }

  return null
}




export const handleLogin = async (e: FormEvent<HTMLFormElement>, router: AppRouterInstance) => {
  e.preventDefault();
  const loginForm = new FormData(e.currentTarget)

  const form = {
    email: loginForm.get("email") as string,
    password: loginForm.get("password") as string
  }


  const { data, error } = await client.auth.signInWithPassword({
    email: form.email,
    password: form.password
  })

if (error) {
  Swal.fire({
    icon: "error",
    title: "Login Failed",
    text: error.message, 
    confirmButtonColor: "#052659", 
  });
  return;
}


  const user = data.user
  if (!user) return
  const role = user.user_metadata.role as string

  switch (role) {
    case "Legislative":
    case "Executive":
    case "Treasurer":
      router.push("/users/home")
      console.log(role)
      break
    case "Admin":
      router.push("/admin/home")
      console.log(role)
      break
    case "superadmin":
      router.push("/superadmin")
      console.log(role)
      break
    default:
      console.log(user)
      console.log(role)
      router.push("/users/home")
  }

  return
}
