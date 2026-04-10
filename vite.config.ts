// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/p2026/', // 이 부분을 꼭 추가해야 경로 에러가 안 납니다!
})