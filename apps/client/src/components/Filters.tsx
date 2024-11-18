'use client'
import React from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { useFilter } from "@/context/FilterContext"

interface FilterProps {
    uniqueTags: string[]
}

export default function Filters({ uniqueTags }: FilterProps) {
    const { search, tags, upvotes, setSearch, setTags, setUpvotes } = useFilter()

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpvotes({ ...upvotes, min: Number(e.target.value) });
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const max = e.target.value ? Number(e.target.value) : undefined;
        setUpvotes({ ...upvotes, max });
    };

    const handleTags = (tag: string) => {
        if (tags.includes(tag)) {
            setTags(tags.filter(t => t !== tag));
        } else {
            setTags([...tags, tag]);
        }
    };

    return (
        <>
            <div className="lg:hidden">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <h1 className='text-base'>Filters</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='mb-4'>
                                <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search for a product' />
                            </div>
                            <div className='mb-4'>
                                <Label>Upvotes</Label>
                                <div className='mt-2 flex flex-row gap-2 w-1/2'>
                                    <div className="flex flex-col gap-1 w-full">
                                        <Label htmlFor="min-mobile" className="text-sm">Min</Label>
                                        <Input id="min-mobile" type="number" placeholder="Min" onChange={handleMinChange} />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <Label htmlFor="max-mobile" className="text-sm">Max</Label>
                                        <Input id="max-mobile" type="number" placeholder="Max" onChange={handleMaxChange} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="tags">Tags</Label>
                                <div className='mt-2 flex flex-wrap gap-2'>
                                    {uniqueTags.map(tag => (
                                        <Button
                                            key={tag}
                                            onClick={() => handleTags(tag)}
                                            className={`bg-blue-100 hover:bg-blue-100 text-blue-600 font-normal hover:font-medium rounded-full transition duration-100 ${tags.includes(tag) ? 'bg-blue-200 hover:bg-blue-200' : ''}`}
                                        >
                                            {tag}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="hidden lg:block">
                <h1 className='text-lg font-semibold mt-5 lg:mt-0'>Filters</h1>
                <hr className='hidden lg:block' />
                <div className='my-4'>
                    <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search for a product' />
                </div>
                <div className='mb-4'>
                    <Label>Upvotes</Label>
                    <div className='mt-2 flex flex-row gap-2 w-1/2'>
                        <Input id="min" type="number" placeholder="Min" onChange={handleMinChange} />
                        <Input id="max" type="number" placeholder="Max" onChange={handleMaxChange} />
                    </div>
                </div>
                <div>
                    <Label htmlFor="tags">Tags</Label>
                    <div className='mt-2 flex flex-wrap gap-2'>
                        {uniqueTags.map(tag => (
                            <Button
                                key={tag}
                                onClick={() => handleTags(tag)}
                                className={`bg-blue-100 hover:bg-blue-100 text-blue-600 font-normal hover:font-medium rounded-full transition duration-100 ${tags.includes(tag) ? 'bg-blue-200 hover:bg-blue-200' : ''}`}
                            >
                                {tag}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
