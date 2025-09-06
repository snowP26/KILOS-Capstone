import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import client from "@/src/api/client"
import { handleLogin } from "../../actions/auth"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function updatePassword() {
    return (e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }
  } 
  function updateEmail() {
    return ((e: ChangeEvent<HTMLInputElement>) => { 
      const email = e.target.value;
      const emailRegex = /^\S+@\S+\.\S+$/;

      if(emailRegex.test(email)){
        setEmail(e.target.value)
        return console.log("Valid Email address"); 
      }
      return console.log("Invalid Email address.");
    })
  } 
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={async (e) => handleLogin(e, router)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input 
            name="email" 
            type="email" 
            placeholder="m@example.com" 
            required 
            onChange={updateEmail()}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input 
            type="password" 
            name="password"
            required 
            onChange={updatePassword()}
          />
        </div>
        <Button type="submit" className="w-full bg-white text-black cursor-pointer hover:text-white">
          Login
        </Button>
      </div>
      <div className="text-left text-sm">
        Don&apos;t have an account?{" "}
        <a onClick={() => router.push('/register')} className="underline underline-offset-4 cursor-pointer">
          Sign up
        </a>
      </div>
    </form>
  )


}
