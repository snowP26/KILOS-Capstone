import { AdminNav } from "@/src/app/components/admin/nav"

export default function usersRootLayout({children} : Readonly<{children: React.ReactNode}>){
    return(
        <div className="min-h-screen bg-[#E6F1FF]">
            <AdminNav/>
            {children}
        </div>
    )
}