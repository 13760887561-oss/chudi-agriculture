import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vfqpvwcyhpcwpkbcosio.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcXB2d2N5aHBjd3BrYmNvc2lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MTU2NzksImV4cCI6MjA5NDA5MTY3OX0.-BeEdnPMJ5KZ9ZwXUyXbjir1Nqe1zx4xmmbYkTTtR20'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 网站内容类型定义
export interface CompanyInfo {
  id: number
  company_name: string
  company_name_en: string
  slogan: string
  description: string
  established_year: number
  address: string
  phone: string
  email: string
  wechat: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface Product {
  id: number
  name: string
  description: string
  image_url: string
  category: string
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface Partner {
  id: number
  name: string
  description: string
  type: string
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface News {
  id: number
  title: string
  content: string
  summary: string
  image_url: string
  author: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: number
  name: string
  phone: string
  email: string
  message: string
  is_read: boolean
  created_at: string
}

export interface SiteStats {
  id: number
  years_experience: number
  team_size: number
  doctor_team: number
  service_area: number
  updated_at: string
}