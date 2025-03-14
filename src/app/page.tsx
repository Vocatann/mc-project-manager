"use client";

import { useState } from "react";
import ItemsList from "@/components/ItemsList";

export default function Home() {
  const [itemIds, setItemIds] = useState<number[]>([1, 2, 3]);

  const removeItem = (itemId: number) => {
    setItemIds((prevItemIds) => prevItemIds.filter(id => id !== itemId));
  };

  return (
    <div className="w-1/2 mx-auto bg-blue-500">
      <header className="px-3">
        <button onClick={() => setItemIds([])}>
          Reset
        </button>
      </header>
      <ItemsList itemIds={itemIds} mcVersion="1.21.3" onRemoveItem={removeItem}/>
    </div>
  );
}