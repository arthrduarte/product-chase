import React from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"

export default function Filters() {
    return (
        <>
            <div className="lg:hidden">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <h1>Filters</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='mb-4'>
                                <Input type="text" placeholder='Search for a product' />
                            </div>
                            <div className='mb-4'>
                                <Label>Upvotes</Label>
                                <div className='mt-2 flex flex-row gap-2 w-1/2'>
                                    <Input id="min" type="number" placeholder="Min" />
                                    <Input id="max" type="number" placeholder="Max" />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="tags">Tags</Label>
                                <div className='mt-2 flex flex-wrap gap-2'>
                                    <Button className='bg-blue-100 hover:bg-blue-100 text-blue-600 font-normal hover:font-medium rounded-full transition duration-100'>Social Media</Button>
                                    <Button className='bg-blue-100 hover:bg-blue-100 text-blue-600 font-normal hover:font-medium rounded-full transition duration-100'>AI</Button>
                                    <Button className='bg-blue-100 hover:bg-blue-100 text-blue-600 font-normal hover:font-medium rounded-full transition duration-100'>Health and Fitness</Button>
                                    <Button className='bg-blue-100 hover:bg-blue-100 text-blue-600 font-normal hover:font-medium rounded-full transition duration-100'>Nature</Button>
                                    <Button className='bg-blue-100 hover:bg-blue-100 text-blue-600 font-normal hover:font-medium rounded-full transition duration-100'>Marketing</Button>
                                    <Button className='bg-blue-100 hover:bg-blue-100 text-blue-600 font-normal hover:font-medium rounded-full transition duration-100'>Physical Product</Button>
                                    <Button className='bg-blue-100 hover:bg-blue-100 text-blue-600 font-normal hover:font-medium rounded-full transition duration-100'>E-commerce</Button>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="hidden lg:block">
                <h1>Filters</h1>
                <div className='mb-4'>
                    <Input type="text" placeholder='Search for a product' />
                </div>
                <div className='mb-4'>
                    <Label>Upvotes</Label>
                    <div className='mt-2 flex flex-row gap-2 w-1/2'>
                        <Input id="min" type="number" placeholder="Min" />
                        <Input id="max" type="number" placeholder="Max" />
                    </div>
                </div>
                <div>
                    <Label htmlFor="tags">Tags</Label>
                    <div className='mt-2 flex flex-wrap gap-2'>
                        <Button className='bg-blue-100 hover:bg-blue-100 text-blue-600 font-normal hover:font-medium rounded-full transition duration-100'>Social Media</Button>
                        <Button className='bg-blue-100 hover:bg-blue-100 text-blue-600 font-normal hover:font-medium rounded-full transition duration-100'>AI</Button>
                        <Button className='bg-blue-100 hover:bg-blue-100 text-blue-600 font-normal hover:font-medium rounded-full transition duration-100'>Health and Fitness</Button>
                        <Button className='bg-blue-100 hover:bg-blue-100 text-blue-600 font-normal hover:font-medium rounded-full transition duration-100'>Nature</Button>
                        <Button className='bg-blue-100 hover:bg-blue-100 text-blue-600 font-normal hover:font-medium rounded-full transition duration-100'>Marketing</Button>
                        <Button className='bg-blue-100 hover:bg-blue-100 text-blue-600 font-normal hover:font-medium rounded-full transition duration-100'>Physical Product</Button>
                        <Button className='bg-blue-100 hover:bg-blue-100 text-blue-600 font-normal hover:font-medium rounded-full transition duration-100'>E-commerce</Button>
                    </div>
                </div>

            </div>
        </>
    )
}
