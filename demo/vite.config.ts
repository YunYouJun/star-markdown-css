import path from 'node:path'
import Shiki from '@shikijs/markdown-it'
import Vue from '@vitejs/plugin-vue'
import LinkAttributes from 'markdown-it-link-attributes'

import TaskLists from 'markdown-it-task-lists'
import Unocss from 'unocss/vite'
import Markdown from 'unplugin-vue-markdown/vite'

import { defineConfig } from 'vite'
import repoPkg from '../package.json'

const markdownWrapperClasses = 'markdown-body'

export default defineConfig({
  // for GitHub Pages
  base: `/${repoPkg.name}/`,

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },

  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    // https://github.com/antfu/vite-plugin-vue-markdown
    Markdown({
      wrapperClasses: markdownWrapperClasses,
      headEnabled: true,
      async markdownItSetup(md) {
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
        md.use(await Shiki({
          defaultColor: false,
          themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
          },
        }))
        md.use(TaskLists)
      },
    }),

    // https://github.com/unocss/unocss
    // see unocss.config.ts for config
    Unocss(),
  ],

  server: {
    fs: {
      strict: true,
    },
  },
})
