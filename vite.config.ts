import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import svgLoader from "vite-svg-loader";
import * as path from 'path';

import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    // ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') }),
    // svgLoader(),
  ],
  resolve: {
    alias: {
        '@': path.resolve(__dirname, './src'),
    },
},
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                @use '@/assets/styles/theme.scss' as *;

            `,
      },
    },
  },
})
