import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // 1. 리액트 플러그인 가져오기

export default defineConfig({
  plugins: [react()], // 2. 플러그인 적용
  base: '/p2026/',
  // base: '/',
})