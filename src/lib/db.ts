import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pygmees_rdc',
  port: parseInt(process.env.DB_PORT || '3306'),
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Pool de connexions pour de meilleures performances
let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

export async function query<T>(
  sql: string, 
  values?: any[]
): Promise<T> {
   const pool = getPool();
   const [rows] = await pool.execute(sql, values ?? []);
   return rows as T;
}

export default { query, getPool };
