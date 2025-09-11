import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-09-05',
  build: {
    transpile: ['vuetify']
  },
  modules: [
    'nuxt-auth-utils',
    '@nuxt/fonts',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify(
          {
            autoImport: true,
            // styles: {
            //   configFile: '@assets/styles/settings.scss'
            // }
          }
        ))
      })
    }
  ],
  ssr: false,
  css: ['vuetify/styles'],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  app: {
    head: {
      titleTemplate: '%s',
    }
  },
  runtimeConfig: {
    databaseUrl: process.env.NUXT_DATABASE_URL!,
    targetGuildId: process.env.GUILD_ID!,
    discordBotToken: process.env.BOT_TOKEN!,
  },
})
