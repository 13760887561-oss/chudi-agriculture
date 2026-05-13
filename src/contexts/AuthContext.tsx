import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AdminUser {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: AdminUser | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 简单的演示账号，实际应该使用Supabase Auth
const DEMO_ADMIN = {
  id: '1',
  email: 'admin@chudi.com',
  password: 'admin123',
  name: '管理员'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 检查本地存储的登录状态
    const storedUser = localStorage.getItem('chudi_admin_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // 简单的演示登录验证
    if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      const userData: AdminUser = {
        id: DEMO_ADMIN.id,
        email: DEMO_ADMIN.email,
        name: DEMO_ADMIN.name
      }
      setUser(userData)
      localStorage.setItem('chudi_admin_user', JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('chudi_admin_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}