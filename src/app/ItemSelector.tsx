"use client";

import { useState } from "react";
import Image from "next/image";

import { MinecraftItem } from "@/types/types";
import { ItemCategories } from "@/types/enums";
import { arrowPathSVG, minusSVG } from "@/utils/svgs";

interface ItemSelectProps {
  itemsMap: Map<ItemCategories, MinecraftItem[]>;
}

const ItemSelector = ({ itemsMap } : ItemSelectProps) => {
  const [selected, setSelected] = useState<MinecraftItem[]>([]);
  const [currentCategory, setCurrentCategory] = useState<ItemCategories>(ItemCategories.Blocks);

  const addItem = (item: MinecraftItem) => {
    if (!selected.find((i) => i.id === item.id)) {
      setSelected([...selected, item]);
    }
  };

  const removeItem = (item: MinecraftItem) => {
    setSelected(selected.filter((i) => i.id !== item.id));
  };

  return (

    <div className="mx-5 mt-10 flex gap-5">
      <section className="w-1/2">
        <ul className="flex gap-2">
          <li className="border-2 border-b-0 border-border rounded-t-lg w-[44px] h-[44px] overflow-hidden">
            <CategorySelectButton category={ItemCategories.Blocks} setCurrentCategory={setCurrentCategory}/>
          </li>
          <li className="border-2 border-b-0 border-border rounded-t-lg w-[44px] h-[44px] overflow-hidden">
            <CategorySelectButton category={ItemCategories.Decorative} setCurrentCategory={setCurrentCategory}/>
          </li>
          <li className="border-2 border-b-0 border-border rounded-t-lg w-[44px] h-[44px] overflow-hidden">
            <CategorySelectButton category={ItemCategories.Materials} setCurrentCategory={setCurrentCategory}/>
          </li>
          <li className="border-2 border-b-0 border-border rounded-t-lg w-[44px] h-[44px] overflow-hidden">
            <CategorySelectButton category={ItemCategories.Food} setCurrentCategory={setCurrentCategory}/>
          </li>
          <li className="border-2 border-b-0 border-border rounded-t-lg w-[44px] h-[44px] overflow-hidden">
            <CategorySelectButton category={ItemCategories.Redstone} setCurrentCategory={setCurrentCategory}/>
          </li>
        </ul>

        <ul className="flex flex-wrap gap-1 p-1 h-[400px] overflow-y-scroll border-2 rounded-sm border-border">
          {(itemsMap.get(currentCategory) ?? []).map((item: MinecraftItem) => {
            if (item.name === "air") return null;
            return (
              <li key={item.id} className="border-2 rounded-sm border-border w-[44px] h-[44px] overflow-hidden">
                <button className="" onClick={() => addItem(item)}><Image src={`/icons/${item.name}.png`} alt={item.displayName} width={32} height={32}/></button>
              </li>
            );
          })}
        </ul>

        <ul className="flex gap-2">
          <li className="border-2 border-t-0 border-border rounded-b-lg w-[44px] h-[44px] overflow-hidden">
            <CategorySelectButton category={ItemCategories.Misc} setCurrentCategory={setCurrentCategory}/>
          </li>
          <li className="border-2 border-t-0 border-border rounded-b-lg w-[44px] h-[44px] overflow-hidden">
            <CategorySelectButton category={ItemCategories.Armor} setCurrentCategory={setCurrentCategory}/>
          </li>
          <li className="border-2 border-t-0 border-border rounded-b-lg w-[44px] h-[44px] overflow-hidden">
            <CategorySelectButton category={ItemCategories.Tools} setCurrentCategory={setCurrentCategory}/>
          </li>
          <li className="border-2 border-t-0 border-border rounded-b-lg w-[44px] h-[44px] overflow-hidden">
            <CategorySelectButton category={ItemCategories.SpawnEgg} setCurrentCategory={setCurrentCategory}/>
          </li>
        </ul>
      </section>
      <section className="border-2 rounded-sm border-border w-1/2">
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
    </div>
  );
};

interface CategorySelectButtonProps {
  category: ItemCategories;
  setCurrentCategory: (category: ItemCategories) => void;
}

const CategorySelectButton = ({ category, setCurrentCategory } : CategorySelectButtonProps) => {
  return (
    <button onClick={() => setCurrentCategory(category)}>
      {category}
    </button>
  );
}

export default ItemSelector;