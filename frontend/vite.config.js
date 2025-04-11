import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

import vue from '@vitejs/plugin-vue'
import { quasar } from '@quasar/vite-plugin'
import { resolve, join } from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        tailwindcss(),
        vue(),
        quasar()
    ],
    resolve: {
      alias: [
        { find: /@(.*)/, replacement: join(resolve(__dirname, 'src'), "$1") }
      ],
      // Automatically resolve index.vue
      extensions: ['.js', '.vue', '.json'],
    },
});
