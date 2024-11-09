import React, { useState } from 'react'
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const availableTags = ["Productivity", "Development", "Design", "Finance", "Social", "Marketing", "Sales", "AI", "Health", "Fitness", "Travel", "Platforms", "Web3", "Physical Products", "Ecommerce"];

export default function AddProduct() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const [tags, setTags] = useState<string[]>([])

    const handleTagChange = (tag: string) => {
        setTags(prevTags =>
            prevTags.includes(tag)
                ? prevTags.filter(t => t !== tag)
                : [...prevTags, tag]
        )
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(title, description, url, tags)

        try {
            const response = await fetch('http://localhost:4000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    url,
                    upvotes: 0,
                    tags
                }),
            })

            if (!response.ok) throw new Error("Failed to add product")

            setTitle('')
            setDescription('')
            setUrl('')
            setImageFile(null)
            setTags([])
            alert('Product added successfully!')
        } catch (error) {
            console.error(error)
            alert("Error adding product")
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <p className="bg-blue-400 hover:bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-lg">
                        Add Product
                    </p>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add a product</DialogTitle>
                        <DialogDescription>
                            Add your product to Product Chase. When you are done, share it with the world.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="Enter product title" required value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" placeholder="Enter product description" required value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="url">URL</Label>
                            <Input id="url" placeholder="Enter product URL" type="url" required value={url} onChange={(e) => setUrl(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="tags">Tags</Label>
                            <div className="flex flex-wrap gap-2">
                                {availableTags.map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => handleTagChange(tag)}
                                        className={`py-1 px-2 text-sm rounded-md ${tags.includes(tag) ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-700'}`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className='flex flex-row gap-2 items-center'>
                                <Label htmlFor="image">Image URL</Label>
                                <p className="text-sm text-gray-500">Optional</p>
                            </div>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="cursor-pointer mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-blue-400 hover:bg-blue-500">
                            Submit
                        </Button>
                    </form>

                </DialogContent>
            </Dialog>

        </>
    )
}
