"use client"

import client from '@/src/api/client'
import React, { useEffect, useState } from 'react'

export default function Page() {
    const [role, setRole] = useState<string | null>(null)

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await client.auth.getUser()

            if (user) {
                console.log(user)

                const userRole = user.user_metadata.role as string
                console.log("User role:", userRole)
                setRole(userRole)
            }
        }

        getUser()
    }, [])

    if (!role) {
        return <p>Loading...</p>
    }

    return (
        <>
            {role === "Legislative" && <h1>Legislative View</h1>}
            {role === "Executive" && <h1>Executive View</h1>}
            {role === "Treasurer" && <h1>Treasurer View</h1>}
            {role === "admin" && <h1>Admin Dashboard</h1>}
            {role === "superadmin" && <h1>Superadmin Dashboard</h1>}
        </>
    )
}
