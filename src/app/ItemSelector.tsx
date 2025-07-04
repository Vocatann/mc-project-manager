"use client";

import { useState } from "react";

import { MinecraftItem } from "@/types/types";
import { arrowPathSVG, minusSVG } from "@/utils/svgs";

interface ItemSelectProps {
  items: MinecraftItem[];
}

const ItemSelector = ({ items } : ItemSelectProps) => {
  const [selected, setSelected] = useState<MinecraftItem[]>([]);

  const addItem = (item: MinecraftItem) => {
    if (!selected.find((i) => i.id === item.id)) {
      setSelected([...selected, item]);
    }
  };

  const removeItem = (item: MinecraftItem) => {
    setSelected(selected.filter((i) => i.id !== item.id));
  };

  return (

    <div>
      <section className="border-2 rounded-sm border-border w-1/2 mx-auto mt-20">
        <ul className="border-b-2 border-border flex items-center">
          <li>
            <button
              onClick={() => setSelected([])}
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
        <ul>
          {selected.map((item) => (
            <li key={item.id}>
              {item.displayName}
              <button onClick={() => removeItem(item)}>
                {minusSVG}
              </button>
            </li>
          ))}
        </ul>
      </section>
      <ul>
        {items.map((item: MinecraftItem) => (
          <li key={item.id}>
            <button onClick={() => addItem(item)}>{item.displayName}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemSelector;