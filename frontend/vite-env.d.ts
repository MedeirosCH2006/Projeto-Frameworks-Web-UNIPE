/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string // Tipagem da sua variável de ambiente
    // Se tiver outras variáveis, adicione-as aqui
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }