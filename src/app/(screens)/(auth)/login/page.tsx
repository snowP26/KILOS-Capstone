'use client';

import client from "@/src/api/client";
import { loginRoute } from "@/src/app/actions/auth";
import { LoginForm } from "@/src/app/components/auth/login-form"
import { TextIcon } from "@/src/app/components/text-logo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const router = useRouter()

    useEffect(() => {
        const getUser = async () => {
            const { data } = await client.auth.getUser();
            if (data?.user != null) { 
                return loginRoute(data.user, router)
            }else{
                return
            }   
        }

        getUser();
    }, [])
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="bg-[#021024] text-white flex flex-col gap-4 p-6 md:p-10 ">
                <div className="flex justify-center gap-2 md:justify-start">
                    <TextIcon />
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="bg-[#BDDBDB] relative hidden lg:block">
                <img className="h-screen w-screen" src="/login.svg" />
            </div>
        </div>
    )
}
