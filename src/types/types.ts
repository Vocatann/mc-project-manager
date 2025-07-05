import { ItemCategories } from "./enums";

export type MinecraftItem = {
  id: number;
  name: string;
  displayName: string;
  stackSize: number;
  category: ItemCategories;
};