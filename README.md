# star-markdown-css

> Markdown Css about violet wandering planet.

![npm](https://img.shields.io/npm/v/star-markdown-css.svg?style=for-the-badge)
![npm](https://img.shields.io/npm/dt/star-markdown-css.svg?style=for-the-badge)
![npm](https://img.shields.io/npm/l/star-markdown-css.svg?style=for-the-badge)
![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/star-markdown-css.svg?style=for-the-badge)

## [Demo](https://yunyoujun.github.io/star-markdown-css)

## Theme

- [x] Star
- [ ] Blood
- [ ] Pure

## Install

- Download [manually](https://github.com/YunYouJun/star-markdown-css/archive/master.zip)

### NPM

```sh
npm install star-markdown-css
```

### Yarn

```sh
yarn add star-markdown-css
```

## Usage

### Html

Import the `star-markdown.css` file and add a `markdown-body` class to the container of your rendered Markdown and set a width for it.
GitHub uses `980px` width and `45px` padding, and `15px` padding for mobile.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="star-markdown.css">
<style>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
<article class="markdown-body">
  <h1>Unicorns</h1>
  <p>All the things</p>
</article>
```

### Vue Component

```html
<template>
  <vue-markdown
    :source="mdText"
    class="markdown-body"/>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import axios from 'axios'
import 'star-markdown-css/dist/star-markdown.css'
export default {
  name: 'MdViewer',
  components: {
    VueMarkdown
  },
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      mdText: ''
    }
  },
  created() {
    axios.get(this.src).then(res => {
      this.mdText = res.data
    })
  }
}
</script>

<style>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 0px 20px;
}
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
```

## Dev

```sh
# Install Dependencies
yarn
# start dev
yarn start
# You can see in http://localhost:2333
# Or modify port config in gulpfile.js 'browser-sync'
```

## Intend

- [ ] Auto Release
- [ ] Add KLK Style (Pure & Blood)

## Thanks

- [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)

## Change Log

- 2019.01.04 Update to gulp 4.0.0