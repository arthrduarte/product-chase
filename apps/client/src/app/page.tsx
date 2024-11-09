import Image from "next/image";
import Products from "@/components/Products";
import Filters from "@/components/Filters";

export default function Home() {
  return (
      <main className="lg:mx-[20rem]">
        <div className="flex flex-col-reverse lg:flex-row lg:gap-4">
          <div className="lg:w-2/3">
            <Products />
          </div>
          <div className="lg:w-1/3">
            <Filters />
          </div>
        </div>
      </main>
  );
}
