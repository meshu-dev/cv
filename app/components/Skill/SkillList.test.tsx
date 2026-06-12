import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SkillList from '@/components/Skill/SkillList'

describe('SkillList tests', () => {
  it('renders skill name and technologies', () => {
    render(
      <SkillList
        skill={{
          name: 'Backend',
          technologies: ['Node.js', 'PHP'],
        }}
      />
    )

    expect(screen.getByRole('heading', { name: 'Backend' })).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('PHP')).toBeInTheDocument()
  })
})
