# star-markdown-css

> Markdown Css about starry.

![Demo](https://github.com/YunYouJun/star-markdown-css/workflows/Demo/badge.svg)
[![npm](https://img.shields.io/npm/v/star-markdown-css.svg)](https://www.npmjs.com/package/star-markdown-css/)
[![npm](https://img.shields.io/npm/dt/star-markdown-css.svg)](https://npm-stat.com/charts.html?package=star-markdown-css)
![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/star-markdown-css.svg)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/star-markdown-css.svg)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/star-markdown-css)](https://cdn.jsdelivr.net/npm/star-markdown-css/dist/yun/yun-markdown.min.css)

- [Demo](https://smc.yunyoujun.cn)

## Theme

![Planet](./demo/public/img/planet.png)
![Blood](./demo/public/img/blood.png)

- [x] Planet(default): violet wandering planet
- [ ] Blood
- [ ] Pure

## Install By

### Download

- Download [manually](https://github.com/YunYouJun/star-markdown-css/archive/main.zip)

### CDN

- JSDELIVR: <https://cdn.jsdelivr.net/npm/star-markdown-css/dist/planet/planet-markdown.min.css>
- unpkg: <https://unpkg.com/star-markdown-css/dist/planet/planet-markdown.min.css>

### Yarn Or NPM

```sh
yarn add star-markdown-css
# or
npm install star-markdown-css
```

## Usage

> Import the `star-markdown.css` file and add a `markdown-body` class to the container of your rendered Markdown and set a width for it.
> GitHub uses `980px` width and `45px` padding, and `15px` padding for mobile.

### Html

Just use css with link tag.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/star-markdown-css/dist/planet/planet-markdown.min.css"
/>
```

#### Example In HTML

In html.

```html
<html>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/star-markdown-css/dist/planet/planet-markdown.min.css"
  />
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
  <body>
    <article class="markdown-body">
      <h1>Unicorns</h1>
      <p>All the things</p>
    </article>
  </body>
</html>
```

### Vue

Just import it where you need it.

```js
import 'star-markdown-css'
```

#### Example In Vue

In a vue component.

> You can try [vite-plugin-vue-markdown](https://github.com/mdit-vue/vite-plugin-vue-markdown).

```html
<template>
  <div class="markdown-body">
    <!-- You Markdown -->
  </div>
</template>

<script>
  import 'star-markdown-css'
  // ...
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

Or in `main.ts`:

```ts
import 'star-markdown-css'
// ...
```

## Dev

### Start

```sh
# Install Dependencies
pnpm
# start dev
pnpm dev
# You can see in http://localhost:3333
```

### Build

```sh
yarn build
```

## Intend

- [ ] Add KLK Style (Pure & Blood)
- [ ] Use Vue Demo

## Thanks

- [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)

## [Sponsors](https://sponsors.yunyoujun.cn)

<p align="center">
  <a href="https://sponsors.yunyoujun.cn">
    <img src='https://fastly.jsdelivr.net/gh/YunYouJun/sponsors/public/sponsors.svg'/>
  </a>
</p>
