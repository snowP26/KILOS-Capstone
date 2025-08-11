import { UserNav } from "@/src/app/components/user/nav_user"

export default function usersRootLayout({children} : Readonly<{children: React.ReactNode}>){
    return(
        <div className="min-h-screen bg-[#E6F1FF]">
            <UserNav/>
            {children}
        </div>
    )
}