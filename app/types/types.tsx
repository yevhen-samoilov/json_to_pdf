export interface ResumeData {
    firstName?: string
    lastName?: string
    title?: string
    profileImage?: string
    personalInfo?: string
    contact?: string[]
    skills?: { name: string; level: number }[]
    languages?: string[]
    highlights?: string[]
    experiences?: { period: string; title: string; responsibilities: string[] }[]
    education?: { period: string; institution: string; degree?: string }[]
    homecity?: string
    homecountry?: string
    currentcity?: string
    phone?: string
    email?: string
    birthdate?: string
    current_address?: string
    is_married?: string
}
  
export interface ResumeHeaders {
    personalData?: string
    contact?: string
    skillset?: string
    languages?: string
    experience?: string
    education?: string
}
  
export interface ResumeTheme {
    name: string
    primaryColor?: string
    fontFamily?: string
}
  
  