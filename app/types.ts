export type Auth = {
  token: string
}

export type CV = {
  profile: Profile
  skill_groups: SkillGroup[]
  work_experiences: WorkExperience[]
  pdf: string | null
}

export type Profile = {
  details: {
    fullname: string
    intro: string
    location: string
  }
  sites: ProfileSite[]
}

export type ProfileSite = {
  name: string
  url: string
  image: string
}

export type SkillGroup = {
  name: string,
  technologies: string[]
}

export type WorkExperience = {
  title: string
  description: string
  location: string
  start_date: string
  end_date: string
  responsibilities: string[]
}

export type ApiResponse = Response & { data: any }

export type ToastStatus = "success" | "error" | "warning" | "info" | "loading"
