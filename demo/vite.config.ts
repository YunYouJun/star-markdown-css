import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-vue-markdown'

import TaskLists from 'markdown-it-task-lists'
import Prism from 'markdown-it-prism'
import LinkAttributes from 'markdown-it-link-attributes'

import Unocss from 'unocss/vite'

const markdownWrapperClasses = 'markdown-body'

export default defineConfig({
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
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Prism)
        md.use(LinkAttributes, {
          pattern: /^https?:\/\//,
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
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

  optimizeDeps: {
    include: [
      'vue',
      '@vueuse/core',
      '@vueuse/head',
    ],
  },
})
