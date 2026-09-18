import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

export default defineConfig({
  integrations: [
    vue({
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('cai-')
      }
    })
  ],
  site: 'https://github.com/cloudinary-devs/clara-denari',
  title: 'Clara Denari Adventures',
  description: 'Clara Denari Adventures by Cloudinary'
}); 