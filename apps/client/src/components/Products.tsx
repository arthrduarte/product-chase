import Link from 'next/link'
import React from 'react'

export default function Products() {
    return (
        <>
            <h1>All Products</h1>
            <div className='text-sm'>
                <div className='flex flex-row justify-between gap-2'>
                    <div className='flex flex-row'>
                        <div className='mr-2'>
                            <img src="https://picsum.photos/200/300" className='w-10 h-10 rounded-full' alt="" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <Link href="/about">
                                <strong>Facebook</strong>
                                <span className='mx-1'>-</span>
                                Access your friends at all times
                            </Link>
                        </div>
                        <div className='text-gray-400 font-light'>
                            <p>Social Media</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center rounded px-2 text-gray-400 justify-center'>
                        <p>⬆️</p>
                        <p>190</p>
                    </div>
                </div>
            </div>
        </>
    )
}