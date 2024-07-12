
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
            buildDirectory: 'build', // この行を追加
        }),
        react(),
    ],
    build: {
        manifest: 'manifest.json', // この行を変更
        outDir: 'public/build',
        assetsDir: 'assets',
        rollupOptions: {
            input: 'resources/js/app.tsx',
            output: {
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]',
            },
        },
    },
});
