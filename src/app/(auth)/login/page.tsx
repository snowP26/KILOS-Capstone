import { ComNav } from "@/src/app/components/community/nav";
import Link from "next/link";


export default function Login() {
    return (
        <div>
            <ComNav />
            <h1>Login Screen</h1>
            <nav>
                <Link href='/register'>Register</Link>
            </nav>
        </div>
    )
}