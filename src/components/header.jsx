"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
    return (
        <header className="w-full border-b bg-white sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-700">
                    System<span className="text-gray-900">Medicals</span>
                </Link>

                {/* Menu */}
                <nav className="hidden md:flex items-center space-x-6">
                    <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                        Home
                    </Link>
                    <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
                        Contact
                    </Link>
                </nav>

                {/* CTA */}
                <div className="flex items-center space-x-3">
                    <Link href="/login">
                        <Button>Login</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}