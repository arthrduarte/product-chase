'use client'
import Products from "@/components/Products";
import Filters from "@/components/Filters";
import { useState } from "react";

export default function Home() {
  const [uniqueTags, setUniqueTags] = useState<string[]>([]);

  return (
    <main className="lg:mx-[20rem]">
      <div className="flex flex-col-reverse lg:flex-row lg:gap-4">
        <div className="lg:w-2/3">
          <Products uniqueTags={uniqueTags} setUniqueTags={setUniqueTags} />
        </div>
        <div className="lg:w-1/3">
          <Filters uniqueTags={uniqueTags} />
        </div>
      </div>
    </main>
  );
}
