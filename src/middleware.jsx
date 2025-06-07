import { NextResponse } from "next/server"

export function middleware(request) {
    // All admin routes are protected
    if (request.nextUrl.pathname.startsWith("/admin")) {
        // Supabase session is stored in cookies (usually under 'sb-access-token')
        const accessToken = request.cookies.get("sb-access-token")?.value

        // No access token? Redirect to login
        if (!accessToken) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    // Continue if authenticated or not admin route
    return NextResponse.next()
}

// Specify paths where middleware runs
export const config = {
    matcher: ["/admin/:path*"],
}