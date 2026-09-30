import { describe, expectTypeOf, test } from 'vitest'
import type {
  ApiResponse,
  Auth,
  ContactResponse,
  CV,
  Profile,
  ProfileSite,
  Skill,
  WorkExperience,
} from './types'

describe('types', () => {
  test('Auth', () => {
    expectTypeOf<Auth>().toEqualTypeOf<{ token: string }>()
  })

  test('ProfileSite', () => {
    expectTypeOf<ProfileSite>().toEqualTypeOf<{ name: string; url: string; icon: string }>()
  })

  test('Profile', () => {
    expectTypeOf<Profile>().toEqualTypeOf<{
      fullname: string
      intro: string
      location: string
      sites: ProfileSite[]
    }>()
  })

  test('Skill', () => {
    expectTypeOf<Skill>().toEqualTypeOf<{ name: string; technologies: string[] }>()
  })

  test('WorkExperience', () => {
    expectTypeOf<WorkExperience>().toEqualTypeOf<{
      title: string
      description: string
      location: string
      start_date: string
      end_date: string
      responsibilities: string[]
    }>()
  })

  test('CV composes the other types', () => {
    expectTypeOf<CV['profile']>().toEqualTypeOf<Profile>()
    expectTypeOf<CV['skills']>().toEqualTypeOf<Skill[]>()
    expectTypeOf<CV['work_experiences']>().toEqualTypeOf<WorkExperience[]>()
    expectTypeOf<CV['pdf']>().toEqualTypeOf<string | null>()
  })

  test('ApiResponse wraps its type parameter and defaults to unknown', () => {
    expectTypeOf<ApiResponse<CV>['data']>().toEqualTypeOf<CV>()
    expectTypeOf<ApiResponse['data']>().toEqualTypeOf<unknown>()
  })

  test('ContactResponse', () => {
    expectTypeOf<ContactResponse>().toEqualTypeOf<{ success: boolean; message: string }>()
  })
})
