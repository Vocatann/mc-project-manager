import minecraftData from 'minecraft-data'
import minecraftAssets from 'minecraft-assets';

import ItemSelector from "@/app/ItemSelector";
import { MinecraftItem } from '@/types/types';

export default async function Home() {
  const version = '1.21.1';

  const assets = minecraftAssets(version);
  const data = minecraftData(version);
  const items: MinecraftItem[] = Object.values(data.items) as MinecraftItem[];

  const iconsMap: Record<string, string> = {};
  for (const item of items) {
    if (item.name !== 'air') {
      const texture = assets.getTexture(item.name);
      if (texture && typeof texture === 'string') {
        iconsMap[item.name] = `/textures/${texture}`;
      }
    }
  }

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
      <ItemSelector items={items} iconsMap={iconsMap}/>
    </div>
  );
}