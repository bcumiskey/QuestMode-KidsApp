import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Quest & Grow',
        short_name: 'Quest & Grow',
        description: 'Gamified family quest system where tasks ARE gameplay',
        start_url: '/',
        display: 'standalone',
        background_color: '#667eea',
        theme_color: '#667eea',
        orientation: 'portrait',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'zustand'],
          firebase: ['firebase/app', 'firebase/database'],
          animation: ['framer-motion'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, 'src/core'),
      '@quests': path.resolve(__dirname, 'src/quests'),
      '@themes': path.resolve(__dirname, 'src/themes'),
      '@progression': path.resolve(__dirname, 'src/progression'),
      '@base-builder': path.resolve(__dirname, 'src/base-builder'),
      '@creatures': path.resolve(__dirname, 'src/creatures'),
      '@parent': path.resolve(__dirname, 'src/parent'),
      '@notifications': path.resolve(__dirname, 'src/notifications'),
      '@shared': path.resolve(__dirname, 'src/shared'),
    },
  },
})
