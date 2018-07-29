# star-markdown-css

> Markdown Css about violet wandering planet.

![npm](https://img.shields.io/npm/v/star-markdown-css.svg?style=for-the-badge)
![npm](https://img.shields.io/npm/dt/star-markdown-css.svg?style=for-the-badge)
![npm](https://img.shields.io/npm/l/star-markdown-css.svg?style=for-the-badge)
![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/star-markdown-css.svg?style=for-the-badge)

Base on [github-markdown-css](https://github.com/sindresorhus/github-markdown-css).

## [Demo](https://yunyoujun.github.io/star-markdown-css)

## Install

- Download [manually](https://github.com/YunYouJun/star-markdown-css/archive/master.zip)

### NPM

```sh
npm install star-markdown-css
# yarn add star-markdown-css
```

## Usage

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

## Theme

- Star
- Blood
- Pure

## Intend

- [ ] Auto Release
- [ ] Add KLK Style (Pure & Blood)