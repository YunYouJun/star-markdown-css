# star-markdown-css

> Markdown Css about violet wandering planet.

Base on [github-markdown-css](https://github.com/sindresorhus/github-markdown-css).

## [Demo](https://yunyoujun.github.io/star-markdown-css)

## Install

- Download [manually](https://raw.githubusercontent.com/YunYouJun/star-markdown-css/master/star-markdown.css)
- CDN: <https://cdnjs.com>

### NPM

```sh
npm install star-markdown-css
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
