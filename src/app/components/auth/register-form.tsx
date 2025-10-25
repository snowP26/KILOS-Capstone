import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { registerUser } from "@/src/app/actions/auth";
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"form">) {

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
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPass) {
            return alert("Passwords must match!");
        }
        await registerUser(formData, router, clearFields);
        return;
    }
    return (
        <form
            onSubmit={handleSubmit}
            className={cn("flex flex-col gap-6", className)} {...props}
        >
            <div className="place-self-center space-y-10">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Create an Account</h1>
                    <p className="text-muted-foreground text-sm">
                        Enter the required details below to register your account
                    </p>
                </div>



                <div className="grid gap-6">
                    <div className="flex flex-row gap-7">
                        <div className="grid gap-3">
                            <Label htmlFor="email">First Name</Label>
                            <Input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid gap-3">

                            <Label htmlFor="email">Last Name</Label>
                            <Input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="m@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="email">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="email">Confirm Password</Label>
                        <Input
                            type="password"
                            name="confirmPass"
                            placeholder="Confirm Password"
                            value={formData.confirmPass}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid">
                        <Label htmlFor="email">Registration Code</Label>
                        <p className="text-muted-foreground text-xs mt-0.5 mb-3">Enter your registration code, this will be given to you by your official counterpart.</p>
                        <Input
                            type="text"
                            name="regCode"
                            placeholder="Registration Code"
                            value={formData.regCode}
                            onChange={handleChange}
                            className="w-fit"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-white text-black cursor-pointer hover:text-white"
                    >
                        Register
                    </Button>
                </div>
                <div className="text-left text-sm">
                    Already have an account?{" "}
                    <a onClick={() => router.push('/login')} className="underline underline-offset-4 cursor-pointer">
                        Log In
                    </a>
                </div>


            </div>
        </form>

    )
}