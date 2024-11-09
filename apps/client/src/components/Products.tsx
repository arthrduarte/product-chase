'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { useFilter } from '@/context/FilterContext'

interface Product {
    title: string
    description: string
    url: string
    upvotes: number
    tags: string[]
}

interface ProductsProps{
    setUniqueTags: (tags: string[]) => void
    uniqueTags: string[]
}

export default function Products({setUniqueTags, uniqueTags}: ProductsProps) {
    const [products, setProducts] = useState<Product[]>([])
    const { search, tags, upvotes } = useFilter()

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
                                        <p key={index}>• {tag}</p>
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
            </ScrollArea>
        </>
    )
}