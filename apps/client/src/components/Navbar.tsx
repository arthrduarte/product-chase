'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import AddProduct from "./AddProduct"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Component() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full ">
            <div className="flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">🏹 Product Chase</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link href="/">Products</Link>
                        <Link href="/about">About</Link>
                    </nav>
                </div>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0">
                        <MobileNav />
                    </SheetContent>
                </Sheet>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
                            <span className="font-bold inline-block">🏹 Product Chase</span>
                        </Link>
                    </div>
                    <SignedOut>
                        <SignInButton>
                            <Button className="hidden md:inline-flex bg-blue-400 hover:bg-blue-500 text-white hover:text-white text-sm font-semibold">Sign In</Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <div className="hidden lg:flex">
                            <AddProduct />
                        </div>
                            <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    )
}

function MobileNav() {
    return (
        <div className="flex flex-col space-y-3">
            <Link href="/" className="font-bold">
                🏹 Product Chase
            </Link>
            <nav className="flex flex-col space-y-3">
                <Link href="/">Products</Link>
                <Link href="/about">About</Link>
            </nav>
            <div>
                <SignedOut>
                    <SignInButton>
                        <Button className="bg-blue-400 hover:bg-blue-500 text-white hover:text-white text-sm font-semibold">Sign In</Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <AddProduct />
                </SignedIn>
            </div>
        </div>
    )
}