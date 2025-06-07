"use client";

import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import {Separator} from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {supabase} from "@/lib/supabaseClient"

export default function AdminLayout({children}) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
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

    if (loading) return <div>Loading...</div>
    if (!user) return null

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1"/>
                    <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4"/>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Building Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block"/>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}