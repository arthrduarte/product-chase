'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'

interface Product {
    title: string
    description: string
    url: string
    upvotes: number
    tags: string[]
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {

                const response = await fetch('http://localhost:4000/products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }
                const data = await response.json()
                setProducts(data)
            } catch (error) {
                console.error("Error fetching products: ", error)
                setProducts([])
            }
        }
        fetchProducts()
    }, [])
    console.log(products)

    return (
        <>
            <h1>All Products</h1>
            <ScrollArea>
                {products.map((product, index) => (
                    <div className='text-base' key={index}>
                        <div className='flex flex-row justify-between gap-2 my-4'>
                            <div className='flex flex-row'>
                                <img src="https://picsum.photos/200/300" className='w-10 h-10 rounded-full' alt="" />
                            </div>
                            <div className='w-full'>
                                <div>
                                    <Link href="/about">
                                        <strong>{product.title}</strong>
                                        <span className='mx-1'>•</span>
                                        {product.description}
                                    </Link>
                                </div>
                                <div className='text-gray-400 text-sm font-light flex flex-wrap gap-1'>
                                    {product.tags.map((tag, index) => (
                                        <p>• {tag}</p>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col items-center rounded px-2 text-gray-400 justify-center'>
                                <p>⬆️</p>
                                <p>{product.upvotes}</p>
                            </div>
                        </div>
                    </div>
                ))}
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