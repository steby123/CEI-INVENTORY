const mysql = require('mysql2/promise');

const testConnection = async () => {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });

    try {
        const connection = await pool.getConnection();
        connection.release();
        console.log('Database connection established');
        return pool;
    } catch (err) {
        console.error('Database connection error:', err.message); 
        throw err;
    }
};

module.exports = { testConnection };
