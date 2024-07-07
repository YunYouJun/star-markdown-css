# Markdown CSS Demo

## Headers 标题

# h1 Heading 标题

## h2 Heading 标题

### h3 Heading 标题

#### h4 Heading 标题

##### h5 Heading 标题

###### h6 Heading 标题

---

## Horizontal Rules 水平线

Hyphens

---

Asterisks \*\*\*

---

Underscores \_\_\_

---

## Emphasis

Simple Text 中文文本

**This is bold text 中文文本**

**This is bold text 中文文本**

_This is italic text 中文文本_

_This is italic text 中文文本_

~~Strike through 中文文本~~

## Blockquotes

> Blockquotes can also be nested...
>
> > ...by using additional greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.

## Lists

Unordered

- Create a list by starting a line with `+`, `-`, or `*`
- Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
  - Marker character change forces new list start:
    - you need has a unified style
      - TEST
- Very easy! I am used to `-`.

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

   1. TEST
   2. TEST
   3. TEST
      1. TEST
      2. TEST
      3. TEST

4. You can use sequential numbers...
5. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar

## Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

Block code "fences"

```txt
Sample text here...
```

Syntax highlighting ( This is not a function of star-markdown-css. )

You can visit [highlight](https://github.com/highlightjs/highlight.js)
or [Prism](https://github.com/PrismJS/prism).

```js
const foo = function (bar) {
  return bar++
}

console.log(foo(5))
```

## Tables

| Option | Description                                                               |
| ------ | ------------------------------------------------------------------------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default.    |
| ext    | extension to be used for dest files.                                      |

Right aligned columns

| Option |                                                               Description |
| -----: | ------------------------------------------------------------------------: |
|   data | path to data files to supply the data that will be passed into templates. |
| engine |    engine to be used for processing templates. Handlebars is the default. |
|    ext |                                      extension to be used for dest files. |

## Links

<https://github.com/YunYouJun/star-markdown-css>

[I'm the project address in github.][github]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself]

Some text to show that the reference links can follow later.

[github]: https://github.com/YunYouJun/star-markdown-css
[1]: https://yunyoujun.cn
[link text itself]: https://star-markdown-css.yunyoujun.cn

- [Octodex GitHub](https://octodex.github.com/)

## Images

![小云](https://cdn.jsdelivr.net/gh/YunYouJun/yun/images/yun-alpha-compressed.png 'Xiao Yun')

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://cdn.jsdelivr.net/gh/YunYouJun/yun/images/meme/yun-good-alpha.png 'Good'

## Emoji

😎

## Inline Html

To reboot your computer, press <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>del</kbd> .

## Task List

- [ ] learning
  - [x] eat
  - [ ] sleep
- [x] drink

## Dl Dt

<dl>
  <dt>HyperText Markup Language (HTML)</dt>
  <dd>The language used to describe and define the content of a Web page</dd>
  <dt>Cascading Style Sheets (CSS)</dt>
  <dd>Used to describe the appearance of Web content</dd>
  <dt>JavaScript (JS)</dt>
  <dd>The programming language used to build advanced Web sites and applications</dd>
</dl>

## `Inline Code` In Header

## Image Align

<img src="https://cdn.jsdelivr.net/gh/YunYouJun/yun/images/meme/yun-good-alpha.png" width="200" align="left" alt="Alt text" title="Good" />
<img src="https://cdn.jsdelivr.net/gh/YunYouJun/yun/images/meme/yun-good-alpha.png" width="200" align="right" alt="Alt text" title="Good" />

Say: Good!

<img src="https://cdn.jsdelivr.net/gh/YunYouJun/yun/images/meme/yun-good-alpha.png" alt="Alt text" title="The Dojocat" />_Description_

## [Sponsors](https://sponsors.yunyoujun.cn)

<p align="center">
  <a href="https://sponsors.yunyoujun.cn">
    <img src='https://fastly.jsdelivr.net/gh/YunYouJun/sponsors/public/sponsors.svg'/>
  </a>
</p>
