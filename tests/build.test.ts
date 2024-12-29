import fs from 'fs-extra'
import { expect, it } from 'vitest'
import { themes } from '../config'

it('check built dist css', async () => {
  for (const theme of themes) {
    expect(await fs.pathExists(`dist/${theme}-markdown.css`)).toBeTruthy()
    expect(await fs.pathExists(`dist/${theme}/markdown.min.css`)).toBeTruthy()
  }
})
