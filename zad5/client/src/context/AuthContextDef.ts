import { createContext } from 'react'

export type User = {
  id: number
  name: string
  email: string
}

export type AuthContextType = {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)