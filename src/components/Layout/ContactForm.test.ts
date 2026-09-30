import { expect, test } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import ContactForm from './ContactForm.astro'

const container = await AstroContainer.create()

test('renders a dialog with a required field for each input', async () => {
  // Arrange
  const ids = ['contactform-name', 'contactform-email', 'contactform-message']

  // Act
  const html = await container.renderToString(ContactForm)

  // Assert
  expect(html).toContain('<dialog id="contactform"')
  for (const id of ids) {
    expect(html).toMatch(new RegExp(`for="${id}"`))
    expect(html).toMatch(new RegExp(`id="${id}"[^>]*required`))
  }
  expect(html).toContain('type="email"')
})

test('renders submit and close controls', async () => {
  // Act
  const html = await container.renderToString(ContactForm)

  // Assert
  expect(html).toContain('type="submit"')
  expect(html.match(/commandfor="contactform"/g)).toHaveLength(2)
  expect(html).toContain('method="dialog"')
})
