"use client";

import {LoginForm} from "@/components/login-form";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {supabase} from "@/lib/supabaseClient";

export default function LoginPage() {
    const router = useRouter()

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (data?.user) {
                router.replace("/admin")
            }
        })
    }, [])

    return (
        <div
            className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
}
