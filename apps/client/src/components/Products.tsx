import Link from 'next/link'
import React from 'react'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'

export default function Products() {
    return (
        <>
            <h1>All Products</h1>
            <ScrollArea>
                <div className='text-sm'>
                    <div className='flex flex-row justify-between gap-2 my-4'>
                        <div className='flex flex-row'>
                            <img src="https://picsum.photos/200/300" className='w-10 h-10 rounded-full' alt="" />
                        </div>
                        <div className='w-full'>
                            <div>
                                <Link href="/about">
                                    <strong>Facebook</strong>
                                    <span className='mx-1'>-</span>
                                    Access your friends at all times
                                </Link>
                            </div>
                            <div className='text-gray-400 font-light'>
                                <Badge variant="outline">Social Media</Badge>
                            </div>
                        </div>
                        <div className='flex flex-col items-center rounded px-2 text-gray-400 justify-center'>
                            <p>⬆️</p>
                            <p>190</p>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </>
    )
}