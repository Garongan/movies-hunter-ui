/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_BASEIMAGEURL: string
    readonly VITE_API_KEY: string
    readonly VITE_TOKEN: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }