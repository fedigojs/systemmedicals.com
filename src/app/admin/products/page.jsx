import {AppSidebar} from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

export default function ProductsAdminPage() {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <div className="flex h-full w-full items-center justify-center">
                    <h1 className="text-2xl font-bold">Products Admin Page</h1>
                    <p className="mt-4 text-gray-600">This is the admin page for managing products.</p>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}