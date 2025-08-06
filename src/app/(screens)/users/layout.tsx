import { UserNav } from "@/src/app/components/user/nav_user"

export default function usersRootLayout({children} : Readonly<{children: React.ReactNode}>){
    return(
        <div className="h-screen">
            <UserNav/>
            {children}
        </div>
    )
}