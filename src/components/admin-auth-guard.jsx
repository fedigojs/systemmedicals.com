"use client"

import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {supabase} from "@/lib/supabaseClient"
import {LoadingSpinner} from "@/components/loading-spiner";

export default function AdminAuthGuard({children}) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const router = useRouter()

    useEffect(() => {
        supabase.auth.getUser().then(async ({ data }) => {
            const currentUser = data.user
            setUser(currentUser)
            if (currentUser) {
                // Check if this user is in admin_users table
                const { data: adminUser } = await supabase
                    .from('admin_users')
                    .select('*')
                    .eq('email', currentUser.email)
                    .single()
                if (adminUser) {
                    setIsAdmin(true)
                } else {
                    setIsAdmin(false)
                    router.replace("/login")
                }
            } else {
                setIsAdmin(false)
                router.replace("/login")
            }
            setLoading(false)
        })
    }, [])

    if (loading) return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
            <LoadingSpinner className="w-12 h-12 text-gray-500 animate-spin" />
        </div>
    );
    if (!user || !isAdmin) return null

    return children;
}