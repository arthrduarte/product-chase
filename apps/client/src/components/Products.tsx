'use client'
import React, { useEffect, useState } from 'react'
import { ScrollArea } from './ui/scroll-area'
import { useFilter } from '@/context/FilterContext'
import { Types } from 'mongoose'
import { SignInButton, useUser } from "@clerk/clerk-react";
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from "@/components/ui/toast"
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
    _id: Types.ObjectId,
    title: string
    description: string
    url: string
    upvotes: number
    tags: string[]
    imageUrl: string
}

interface ProductsProps {
    setUniqueTags: (tags: string[]) => void
    uniqueTags: string[]
}

export default function Products({ setUniqueTags, uniqueTags }: ProductsProps) {
    const [products, setProducts] = useState<Product[]>([])
    const { search, tags, upvotes } = useFilter()
    const { isSignedIn } = useUser();
    const { toast } = useToast()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = new URL('https://product-chase.onrender.com/products')
                url.searchParams.append('search', search)
                url.searchParams.append('tags', tags.join(','))
                url.searchParams.append('minUpvotes', upvotes.min.toString())
                if (upvotes.max !== undefined) {
                    url.searchParams.append('maxUpvotes', upvotes.max.toString())
                }

                const response = await fetch(url.toString())
                if (!response.ok) throw new Error('Failed to fetch products')
                const data = await response.json()
                setProducts(data)

                if (uniqueTags.length > 0) return
                const tagsSet = new Set<string>()
                data.forEach((product: Product) => {
                    product.tags.forEach((tag: string) => tagsSet.add(tag))
                })
                setUniqueTags(Array.from(tagsSet))

            } catch (error) {
                console.error("Error fetching products: ", error)
                setProducts([])
            }
        }
        fetchProducts()
    }, [search, tags, upvotes, setUniqueTags, uniqueTags.length])

    const addUpvote = async (id: string) => {
        if (!isSignedIn) {
            toast({
                title: "Sign in",
                description: "You must be signed in to upvote a product",
                className: "bg-blue-400 text-white",
                action: (
                    <div>
                        <SignInButton>
                            <Button className="w-full bg-transparent border hover:bg-white hover:text-blue-400">Sign In</Button>
                        </SignInButton>
                    </div>
                )
            })
            return
        }

        try {
            const response = await fetch(`https://product-chase.onrender.com/products/${id}`, {
                method: 'PUT'
            })

            if (!response.ok) throw new Error('Failed to upvote product')

            const updatedProduct = await response.json()
            setProducts(products.map(product => product._id.toString() === id ? updatedProduct : product))
        } catch (error) {
            console.error("Error upvoting product: ", error)
        }
    }

    return (
        <>
            <h1 className='text-lg font-semibold mt-5 lg:mt-0'>All Products</h1>
            <hr className='hidden lg:block' />
            <ScrollArea>
                {products.map((product, index) => (
                    <div className='text-base' key={index}>
                        <div className='flex flex-row justify-between gap-2 my-8'>
                            <div className='flex flex-row'>
                                <Image 
                                    src={product.imageUrl} 
                                    alt={product.title}
                                    width={500}
                                    height={500}
                                    className='lg:w-12 lg:h-12 w-10 h-8 object-cover'
                                />
                            </div>
                            <div className='w-full'>
                                <div>
                                    <a href={product.url}>
                                        <strong>{product.title}</strong>
                                        <span className='mx-1'>•</span>
                                        {product.description}
                                    </a>
                                </div>
                                <div className='text-gray-400 text-sm font-light flex flex-wrap gap-1'>
                                    {product.tags.map((tag, index) => (
                                        <p key={index}>• {tag}</p>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col items-center rounded px-2 text-gray-400 justify-start hover:shadow-2xl transition ease-in cursor-pointer' onClick={() => addUpvote(product._id.toString())}>
                                <p>⬆️</p>
                                <p>{product.upvotes}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </ScrollArea>
        </>
    )
}