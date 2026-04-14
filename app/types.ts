export type Auth = {
  token: string
}

export type CV = {
  profile: Profile
  skills: Skill[]
  work_experiences: WorkExperience[]
  pdf: string | null
}

export type Profile = {
  fullname: string
  intro: string
  location: string
  sites: ProfileSite[]
}

export type ProfileSite = {
  name: string
  url: string
  image_url: string
}

export type Skill = {
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
