'use client';

import { RegisterForm } from "@/src/app/components/auth/register-form";
import { TextIcon } from "@/src/app/components/text-logo";

export default function Register() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="bg-[#BDDBDB] relative hidden lg:block">
                <img className="h-screen w-screen" src="/login.svg"/>
            </div>
            <div className="bg-[#021024] text-white flex flex-col gap-4 p-6 md:p-10 ">
                <div className="flex justify-center gap-2 md:justify-end">
                    <TextIcon />
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
