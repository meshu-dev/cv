import { expect, test } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import Toast from './Toast.astro'

const container = await AstroContainer.create()

test('renders the toast container', async () => {
  // Act
  const html = await container.renderToString(Toast)

  // Assert
  expect(html).toContain('<div id="toast"></div>')
})
