import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosInstance'
import { useAuth } from '../context/useAuth'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    setError('')

    if (!form.email || !form.password) {
      setError('Email i hasło są wymagane')
      return
    }

    try {
      const res = await api.post('/auth/login', form)
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
      <h2>Logowanie</h2>
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSubmit}>Zaloguj się</button>
      <p>Nie masz konta? <span onClick={() => navigate('/register')} style={{ cursor: 'pointer', color: 'blue' }}>Zarejestruj się</span></p>
    </div>
  )
}