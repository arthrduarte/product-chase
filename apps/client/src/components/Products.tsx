'use client'
import React, { useEffect, useState } from 'react'
import { ScrollArea } from './ui/scroll-area'
import { useFilter } from '@/context/FilterContext'
import { Types } from 'mongoose'
import { SignInButton, useUser } from "@clerk/clerk-react";
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from "@/components/ui/toast"
import { Button } from './ui/button'

interface Product {
    _id: Types.ObjectId,
    title: string
    description: string
    url: string
    upvotes: number
    tags: string[]
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
                const url = new URL('http://localhost:4000/products')
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
    }, [search, tags, upvotes])

    const addUpvote = async (id: string) => {
        if (!isSignedIn) {
            toast({
                title: "Sign in",
                description: "You must be signed in to upvote a product",
                className: "bg-blue-400 text-white",
                action: (
                    <ToastAction altText='Go to sign in' className='hover:text-blue-400'>
                        <SignInButton>
                            Sign In
                        </SignInButton>
                    </ToastAction>
                )
            })
            return
        }

        try {
            const response = await fetch(`http://localhost:4000/products/${id}`, {
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
                                    {/* <Link href={`/product/${product._id.toString()}`}> */}
                                    <strong>{product.title}</strong>
                                    <span className='mx-1'>•</span>
                                    {product.description}
                                    {/* </Link> */}
                                </div>
                                <div className='text-gray-400 text-sm font-light flex flex-wrap gap-1'>
                                    {product.tags.map((tag, index) => (
                                        <p key={index}>• {tag}</p>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col items-center rounded px-2 text-gray-400 justify-center hover:shadow-2xl transition ease-in cursor-pointer' onClick={() => addUpvote(product._id.toString())}>
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