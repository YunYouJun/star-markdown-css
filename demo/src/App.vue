<script setup lang="ts">
import { useHead } from '@vueuse/head'

import Intro from './components/intro.md'
import Demo from './components/demo.md'
import BaseMenu from './components/BaseMenu.vue'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Star Markdown CSS',
  meta: [
    { name: 'description', content: 'Star Markdown CSS Demo' },
  ],
})

window.onhashchange = function () {
  const curTheme = location.hash.slice(1) || 'yun'

  const el = document.querySelector('link[title="theme"]') as HTMLLinkElement
  el.href = `./css/${curTheme}-markdown.min.css`
}
</script>

<template>
  <BaseMenu />
  <Intro />
  <hr>
  <Demo />
</template>
