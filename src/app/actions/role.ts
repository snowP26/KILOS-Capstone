"use client"

import { useEffect, useState } from "react"
import client from "@/src/api/client"

export function useUserRole() {
    const [role, setRole] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await client.auth.getUser()
            if (user) {
                setRole(user.user_metadata.role as string)
            }
            setLoading(false)
        }
        getUser()
        
    }, [])

    

    return { role, loading }
}