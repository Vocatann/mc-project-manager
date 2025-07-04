export type MinecraftItem = {
  id: number;
  name: string;
  displayName: string;
  stackSize: number;
  maxDamage?: number;
  category?: string;
  variations?: { metadata: number; displayName: string }[];
  enchantCategories?: string[];
  repairWith?: number[];
};