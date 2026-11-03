// @ts-check
import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'

import icon from 'astro-icon'

import tailwindcss from '@tailwindcss/vite'

const { PORT, ALLOWED_HOSTS } = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  '',
)

// https://astro.build/config
export default defineConfig({
  integrations: [icon()],

  server: {
    port: PORT ? Number(PORT) : 4321,
    allowedHosts: ALLOWED_HOSTS
      ? ALLOWED_HOSTS.split(',').map((h) => h.trim())
      : [],
  },

  vite: {
    plugins: [tailwindcss()],
  },
})
