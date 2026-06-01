import { useState, useMemo, type ReactNode } from 'react'
import { AuthContext, type User } from './AuthContextDef'

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={useMemo(() => ({ user, token, login, logout }), [user, token])}>
      {children}
    </AuthContext.Provider>
  )
}