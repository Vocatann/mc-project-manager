"use client";

import { useState } from "react";
import ItemsList from "./ItemsList";

const MainPage = () => {
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
      <ItemsList itemIds={itemIds} mcVersion="1.19" onRemoveItem={removeItem}/>
    </div>
  );
}

export default MainPage;