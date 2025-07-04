declare module 'minecraft-assets' {
  interface MinecraftAssets {
    textures: Record<string, string>;
    getTexture(name: string): string;
    textureContent: Record<string, { texture: string }>;
  }

  function minecraftAssets(version: string): MinecraftAssets;
  export = minecraftAssets;
}