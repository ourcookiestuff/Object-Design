import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'shop',
})

export const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `)
  console.log('Database initialized')
}

export default pool