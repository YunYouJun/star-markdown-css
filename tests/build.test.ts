import fs from 'fs-extra'
import { expect, it } from 'vitest'
import { themes } from '../config'

it('check built dist css', async () => {
  for (const theme of themes) {
    expect(await fs.pathExists(`dist/${theme}-markdown.css`)).toBeTruthy()
    expect(await fs.pathExists(`dist/${theme}/markdown.min.css`)).toBeTruthy()
  }
})

it('keeps media styles at element-level specificity', async () => {
  for (const theme of themes) {
    const css = await fs.readFile(`dist/${theme}-markdown.css`, 'utf-8')
    expect(css).toContain(':where(.markdown-body) img {')
    expect(css).not.toMatch(/(^|[\s,])\.markdown-body (img|iframe|video)\b/m)
  }
})
