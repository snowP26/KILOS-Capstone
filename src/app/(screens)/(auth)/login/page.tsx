'use client';

import { LoginForm } from "@/src/app/components/auth/login-form"
import { TextIcon } from "@/src/app/components/text-logo";

export default function LoginPage() {
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
            <div className="bg-yellow relative hidden lg:block">
                
            </div>
        </div>
    )
}
