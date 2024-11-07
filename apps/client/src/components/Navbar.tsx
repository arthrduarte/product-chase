'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Component() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex justify-between">
                <header className="flex flex-row items-center justify-between w-full text-center">
                    <div>
                        <Link href="/">🏹 Product Chase</Link>
                    </div>
                    <nav className="hidden lg:flex ">
                        <Link href="/" className="mx-2">Products</Link>
                        <Link href="/about" className="mx-2">About</Link>
                    </nav>
                    <div className="lg:flex">
                        <SignedOut>
                            <SignInButton>
                                <Button>Sign In</Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                    <div onClick={() => setOpen(prev => !prev)} className="lg:hidden my-auto">
                        <svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1 2H1.75H14.25H15V3.5H14.25H1.75H1V2ZM1 12.5H1.75H14.25H15V14H14.25H1.75H1V12.5ZM1.75 7.25H1V8.75H1.75H14.25H15V7.25H14.25H1.75Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    {open && (
                        <div className="absolute right-0 top-[60px] w-1/2 h-[calc(100vh-44px)] bg-white shadow-lg flex flex-col items-start p-4">
                            <Link href="/">Products</Link>
                            <Link href="/about">About</Link>
                        </div>
                    )}
                </header>
            </div>
        </>
    )
}