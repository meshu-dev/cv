import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SkillSection from '@/components/Skill/SkillSection'

describe('SkillSection', () => {
  it('renders skills section', () => {
    render(
      <SkillSection
        skills={[{
          name: 'Frontend',
          technologies: ['React', 'TypeScript'],
        }, {
          name: 'Backend',
          technologies: ['Node.js', 'PHP'],
        }]}
      />
    )

    expect(screen.getByRole('heading', { name: 'Frontend' })).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: 'Backend' })).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('PHP')).toBeInTheDocument()
  })
})
