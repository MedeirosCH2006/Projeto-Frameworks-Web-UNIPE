import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // CRÍTICO: Força o host para ser acessível na rede (não apenas localhost)
    host: '0.0.0.0',
    port: 3000,
  },
});
