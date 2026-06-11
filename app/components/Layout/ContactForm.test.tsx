import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContactForm from './ContactForm'

describe('ContactForm tests', () => {
  it('renders form when isOpen is false', () => {
    const { container } = render(
      <ContactForm
       isOpen={false}
       onClose={() => {}} />
    )

    expect(container.firstChild).toBeNull()
    expect(container).toBeEmptyDOMElement()
  })
})
