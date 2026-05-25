import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // GitHub Pages: repo name is "yatai-claw-demo"
  const repoName = process.env.REPO_NAME || 'yatai-claw-demo'
  const isCI = process.env.CI || process.env.GITHUB_ACTIONS
  const base = isCI ? `/${repoName}/` : '/'

  return {
    plugins: [react(), tailwindcss()],
    base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
  }
})
