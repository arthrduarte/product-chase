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
import { useToast } from '@/hooks/use-toast'

const availableTags = ["Productivity", "Development", "Design", "Finance", "Social", "Marketing", "Sales", "AI", "Health", "Fitness", "Travel", "Platforms", "Web3", "Physical Products", "Ecommerce"];

export default function AddProduct() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [tags, setTags] = useState<string[]>([])
    const { toast } = useToast()

    const handleTagChange = (tag: string) => {
        setTags(prevTags =>
            prevTags.includes(tag)
                ? prevTags.filter(t => t !== tag)
                : [...prevTags, tag]
        )
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null
        setImageFile(file)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!title || !description || !url || tags.length === 0) {
            toast({
                title: "Invalid form",
                description: "Please fill in all fields",
                className: "bg-red-400 text-white border-transparent",
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('url', url);
            formData.append('tags', JSON.stringify(tags));
            if (imageFile) {
                formData.append('image', imageFile); 
            }

            const response = await fetch('http://localhost:4000/products', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                const errorData = await response.json();
                toast({
                    title: "Error adding product",
                    description: errorData.message || "An error occurred",
                    className: "bg-red-400 text-white border-transparent",
                });
                return;
            }

            setTitle('')
            setDescription('')
            setUrl('')
            setImageFile(null)
            setTags([])
            toast({
                title: "Product added",
                description: "Your product was addded successfully",
                className: "bg-green-400 text-white border-transparent",
            })
        } catch (error) {
            toast({
                title: "Error adding product",
                description: (error as Error).message,
                className: "bg-red-400 text-white border-transparent",
            })
            console.error(error)
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
                                <Label htmlFor="image">Image</Label>
                                <p className="text-sm text-gray-500">Optional</p>
                            </div>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
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
