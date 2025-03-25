import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import configDefaults from 'vitest';

export default defineConfig({
    root: 'src', // A src mappa lesz a gyökér
    plugins: [react()],
    test: {
        ...configDefaults,
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
    },
});
