import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosInstance'
import { useAuth } from '../context/useAuth'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    setError('')

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Wszystkie pola są wymagane')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setError('Nieprawidłowy format email')
      return
    }

    if (form.password.length < 6) {
      setError('Hasło musi mieć minimum 6 znaków')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Hasła nie są identyczne')
      return
    }

    try {
      const res = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      })
      login(res.data.token, res.data.user)
      navigate('/')
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response: { data: { message: string } } }
        setError(axiosErr.response.data.message)
      } else {
        setError('Błąd serwera')
      }
    }
  }

  return (
    <div>
      <h2>Rejestracja</h2>
      <div>
        <input
          name="name"
          placeholder="Imię"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          name="password"
          type="password"
          placeholder="Hasło"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Potwierdź hasło"
          value={form.confirmPassword}
          onChange={handleChange}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSubmit}>Zarejestruj się</button>
      <p>
        Masz już konto?{" "}
        <button
          onClick={() => navigate("/login")}
          style={{
            cursor: "pointer",
            color: "blue",
            background: "none",
            border: "none",
            padding: 0,
            font: "inherit",
            textDecoration: "underline"
          }}
        >
          Zaloguj się
        </button>
      </p>
    </div>
  )
}