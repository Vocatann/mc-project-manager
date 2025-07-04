import minecraftData from 'minecraft-data'

import ItemSelector from "@/app/ItemSelector";
import { MinecraftItem } from '@/types/types';

export default async function Home() {

  const data = minecraftData('1.21.1');
  const items: MinecraftItem[] = Object.values(data.items) as MinecraftItem[];

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
      <ItemSelector items={items} />
    </div>
  );
}