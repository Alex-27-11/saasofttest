import { defineConfig } from 'vite';
import vueSfc from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import path from 'path'; 

export default defineConfig({
  plugins: [
    vueSfc(),
    vuetify({ autoImport: true }),
  ],
  	 base: '/saasofttest',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), 
    },
  },
});
