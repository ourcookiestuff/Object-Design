import { Router, type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// Rejestracja
router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Wszystkie pola są wymagane' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Nieprawidłowy format email' });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ message: 'Hasło musi mieć minimum 6 znaków' });
    return;
  }

  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      res.status(409).json({ message: 'Email już zajęty' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
});

// Logowanie
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email i hasło są wymagane' });
    return;
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      res.status(401).json({ message: 'Nieprawidłowe dane logowania' });
      return;
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).json({ message: 'Nieprawidłowe dane logowania' });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
});

export default router;