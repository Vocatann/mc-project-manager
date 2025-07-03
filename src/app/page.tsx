"use client";

import { useState } from "react";
import ItemsList from "@/components/ItemsList";

import { arrowPathSVG } from "@/utils/svgs";

export default function Home() {
  const [itemIds, setItemIds] = useState<number[]>([1, 2, 3]);

  const removeItem = (itemId: number) => {
    setItemIds((prevItemIds) => prevItemIds.filter(id => id !== itemId));
  };

  return (
    <div className="text-primaryText">
      <header 
        className="flex flex-col items-center"
      >
        <div 
          className="
            w-full 
            h-24 sm:h-30 md:h-40 lg:h-64 
            bg-cover bg-no-repeat bg-center bg-[url('/header.jpg')]
          "
        >
          <div className="h-full w-full bg-gradient-to-b from-transparent via-background/80 to-background"/>
        </div>
        <h1 className="text-xl md:text-2xl lg:text-3xl text-center  w-1/2 lg:w-1/3">Minecraft Todo List</h1>
      </header>
      <div className="w-1/2 mx-auto mt-20">
        <section className="border-2 rounded-sm border-border">
          <ul className="border-b-2 border-border flex items-center">
            <li>
              <button
                onClick={() => setItemIds([])}
                className="w-auto px-2 h-10 flex items-center justify-center border-r-2 border-border hover:bg-border"
              >
                {arrowPathSVG}
              </button>
            </li>
            <li>
              <button
                className="w-auto px-2 h-10 flex items-center justify-center border-r-2 border-border hover:bg-border"
              >
                metric
              </button>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}