import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import {Separator} from "@/components/ui/separator";
import {
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import AdminAuthGuard from "@/components/admin-auth-guard";

export default function AdminLayout({children}) {

    return (
        <AdminAuthGuard>
            <SidebarProvider>
                <AppSidebar/>
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4"/>
                        <a href="/" className="ml-auto underline">
                             return to the homepage Systemmedicals.com
                        </a>
                    </header>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </AdminAuthGuard>
    );
}