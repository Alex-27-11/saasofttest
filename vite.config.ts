import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import path from 'path'; // Add this import

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
  ],
  	 base: '/saasofttest',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Add this to map @ to src
    },
  },
});
