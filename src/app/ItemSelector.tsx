"use client";

import { useState, useRef } from "react";
import Image from "next/image";

import { MinecraftItem, SelectedMinecraftItem } from "@/types/types";
import { ItemCategories, Metrics } from "@/types/enums";
import { ArrowPathSVG, MinusSVG, ChevronDownSVG, ChevronUpSVG } from "@/utils/svgs";

interface ItemSelectProps {
  itemsMap: Map<ItemCategories, MinecraftItem[]>;
}

const ItemSelector = ({ itemsMap } : ItemSelectProps) => {
  const [selected, setSelected] = useState<SelectedMinecraftItem[]>([]);
  const [currentCategory, setCurrentCategory] = useState<ItemCategories>(ItemCategories.Blocks);

  const handleInputChange = (id: number, value: string) => {
    const numericValue = value === "" ? null : Math.max(0, Math.min(parseInt(value) || 0, 9999));
    setSelected(prevSelected =>
      prevSelected.map(item =>
        item.mcItem.id === id ? { ...item, amount: numericValue, ...calculateMetrics(numericValue, item.mcItem.stackSize), } : item
      )
    );
  };

  const addItem = (item: MinecraftItem) => {
    if (!selected.find(i => i.mcItem.id === item.id)) {
      setSelected([...selected, { mcItem: item, amount: 1, amountInStacks: 0, amountInDoubleChests: 0, amountInShulkers: 0 }]);
    }
  };

  const removeItem = (item: SelectedMinecraftItem) => {
    setSelected(selected.filter(i => i.mcItem.id !== item.mcItem.id));
  };

  const handleIncrement = (id: number) => {
    setSelected(prev =>
      prev.map(item =>
        item.mcItem.id === id
          ? {
              ...item,
              amount: item.amount === null ? 1 : Math.min(item.amount + 1, 9999),
              ...calculateMetrics(item.amount === null ? 1 : Math.min(item.amount + 1, 9999), item.mcItem.stackSize),
            }
          : item
      )
    );
  };

  const handleDecrement = (id: number) => {
    setSelected(prev =>
      prev.map(item =>
        item.mcItem.id === id
          ? {
              ...item,
              amount: item.amount === null ? 0 : Math.max(item.amount - 1, 1),
              ...calculateMetrics(item.amount === null ? 0 : Math.max(item.amount - 1, 1), item.mcItem.stackSize),
            }
          : item
      )
    );
  };

  const holdRef = useRef<{ action: (() => void) | null; lastUpdate: number | null; rafId: number | null }>({
    action: null,
    lastUpdate: null,
    rafId: null,
  });

  const HOLD_INTERVAL_MS = 90;

  const startHold = (action: () => void) => {
    holdRef.current.action = action;
    holdRef.current.lastUpdate = performance.now();
    const step = (now: number) => {
      if (holdRef.current.action && holdRef.current.lastUpdate) {
        if (now - holdRef.current.lastUpdate >= HOLD_INTERVAL_MS) {
          holdRef.current.action();
          holdRef.current.lastUpdate = now;
        }
        holdRef.current.rafId = requestAnimationFrame(step);
      }
    };
    action();
    holdRef.current.lastUpdate = performance.now();
    holdRef.current.rafId = requestAnimationFrame(step);
  };

  const stopHold = () => {
    if (holdRef.current.rafId !== null) {
      cancelAnimationFrame(holdRef.current.rafId);
      holdRef.current.rafId = null;
      holdRef.current.action = null;
      holdRef.current.lastUpdate = null;
    }
  };

  const [selectedMetric, setSelectedMetric] = useState<Metrics>(Metrics.Stacks);

  const calculateMetrics = (amount: number | null, stackSize: number) => {
    const value = amount || 0;
    return {
      amountInStacks: Number((value / stackSize).toFixed(1)),
      amountInDoubleChests: Number((value / (stackSize * 54)).toFixed(1)),
      amountInShulkers: Number((value / (stackSize * 27)).toFixed(1)),
    }
  } 

  return (

    <div className="mx-5 mt-10 flex flex-col md:flex-row gap-5">
      <section className="w-full md:w-1/2">
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

        <ul className="flex flex-wrap gap-y-1 gap-x-1 p-1 h-[500px] overflow-y-auto border-2 rounded-sm border-border content-start">
          {(itemsMap.get(currentCategory) ?? []).map((item: MinecraftItem) => {
            if (item.name === "air") return null;
            return (
              <li
                key={item.id}
                className="w-[44px] h-[44px] border-2 border-border rounded-sm m-0"
              >
                <button
                  onClick={() => addItem(item)}
                  className="w-full h-full flex items-center justify-center p-0 overflow-hidden"
                >
                  <Image
                    src={`/textures/${item.name}.png`}
                    alt={item.displayName}
                    width={32}
                    height={32}
                    className="pointer-events-none"
                  />
                </button>
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
      <section className="border-2 rounded-sm border-border w-full md:w-1/2 min-h-[500px]">
        <ul className="border-b-2 border-border flex items-center">
          <li>
            <button
              onClick={() => setSelected([])}
              className="w-auto px-2 h-10 flex items-center justify-center border-r-2 border-border hover:bg-border"
            >
              <ArrowPathSVG/>
            </button>
          </li>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as Metrics.Stacks | Metrics.DoubleChests | Metrics.Shulkers)}
            className="border-r-2 border-border rounded-sm px-1 h-10 bg-background"
          >
            <option value="stacks">Stacks</option>
            <option value="doubleChests">Double Chests</option>
            <option value="shulkers">Shulkers</option>
          </select>
        </ul>
        <ul className="flex flex-col gap-y-2 p-3">
          {selected.map((item) => (
            <li 
              className="flex items-center justify-between"
              key={item.mcItem.id}
            >
              <div className="flex items-center justify-between w-full lg:w-5/6">
                <div className="flex items-center gap-x-5 pr-3">
                  <Image
                    src={`/textures/${item.mcItem.name}.png`}
                    alt={item.mcItem.displayName}
                    width={32}
                    height={32}
                    className="pointer-events-none"
                  />
                  {item.mcItem.displayName}
                </div>
                <div className="flex items-center gap-5">
                  <input 
                    id={`input-${item.mcItem.id}`}
                    type="number"
                    value={item.amount ?? ""}
                    onChange={(e) => handleInputChange(item.mcItem.id, e.target.value)}
                    className="input-no-spinner bg-background border-b-2 border-border min-w-[32px] w-1/4"
                  />
                  <div className="flex flex-col">
                    <button
                      onMouseDown={() => startHold(() => handleIncrement(item.mcItem.id))}
                      onMouseUp={stopHold}
                      onMouseLeave={stopHold}
                      onTouchStart={() => startHold(() => handleIncrement(item.mcItem.id))}
                      onTouchEnd={stopHold}
                    >
                      <ChevronUpSVG/>
                    </button>

                    <button
                      onMouseDown={() => startHold(() => handleDecrement(item.mcItem.id))}
                      onMouseUp={stopHold}
                      onMouseLeave={stopHold}
                      onTouchStart={() => startHold(() => handleDecrement(item.mcItem.id))}
                      onTouchEnd={stopHold}
                    >
                      <ChevronDownSVG/>
                    </button>
                  </div>
                  <span>
                    {selectedMetric === "stacks" && `${item.amountInStacks} stacks`}
                    {selectedMetric === "doubleChests" && `${item.amountInDoubleChests} chests`}
                    {selectedMetric === "shulkers" && `${item.amountInShulkers} shulkers`}
                  </span>
                </div>

              </div>
              <button onClick={() => removeItem(item)}>
                <MinusSVG/>
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