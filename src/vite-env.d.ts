/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string
  readonly VITE_PIXI_MAP_URL: string
  readonly VITE_PIXI_WALL_URL: string
  readonly VITE_PIXI_HERO_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
