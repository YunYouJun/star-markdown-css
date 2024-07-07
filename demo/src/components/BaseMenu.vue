<script lang="ts" setup>
import { isDark, toggleDark } from '~/composables'
</script>

<template>
  <nav class="flex items-center justify-center" m="t-4">
    <button class="transition icon-btn" :style="{ color: isDark ? '' : 'orange' }" @click="toggleDark()">
      <div i="ri-sun-line dark:ri-moon-line" />
    </button>
  </nav>
</template>
