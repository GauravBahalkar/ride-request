import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { authApi } from '../services/auth.api'
import type { User } from '../types/auth.types'

interface AuthContextValue {
  user: User | null
  loading: boolean
  token: string
  login: (email: string, password: string) => Promise<User>
  signup: (
    name: string,
    email: string,
    password: string,
    role: 'customer' | 'vendor',
  ) => Promise<User>
  logout: () => void
  refreshProfile: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }

    authApi
      .me()
      .then((profile) => setUser(profile))
      .catch(() => {
        setUser(null)
        setToken('')
        localStorage.removeItem('token')
      })
      .finally(() => setLoading(false))
  }, [token])

  const login = async (email: string, password: string) => {
    const data = await authApi.login({ email, password })
    localStorage.setItem('token', data.token)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: 'customer' | 'vendor',
  ) => {
    const data = await authApi.signup({ name, email, password, role })
    localStorage.setItem('token', data.token)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem('token')
  }

  const refreshProfile = async () => {
    if (!token) return
    const profile = await authApi.me()
    setUser(profile)
  }

  const value = useMemo(
    () => ({ user, loading, token, login, signup, logout, refreshProfile }),
    [user, loading, token, login, signup, logout, refreshProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
