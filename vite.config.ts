import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize chunking
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - separate heavy dependencies
          'vendor-react': ['react', 'react-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-icons': ['lucide-react', '@phosphor-icons/react'],
          // Heavy libs are already lazy loaded via dynamic imports
        }
      }
    },
    // Increase warning limit since we have proper code splitting
    chunkSizeWarningLimit: 600,
    // Use esbuild for minification (faster than terser)
    minify: 'esbuild',
    // Target modern browsers for smaller output
    target: 'es2020',
    // Enable source maps for debugging (optional - can be removed for production)
    sourcemap: false
  },
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion']
  }
})
