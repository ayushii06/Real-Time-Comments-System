const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

async function getAllComments() {
    const [rows] = await pool.query('SELECT * FROM comments WHERE comment IS NOT NULL ORDER BY timestamp DESC');
    return rows;
}

async function addComment(username, comment) {
    const [rows] = await pool.query('INSERT INTO comments (username, comment) VALUES (?, ?)', [username, comment]);
    return rows;
}

async function deleteAllComments() {
    await pool.query('DELETE FROM comments');
}

async function addUsername(username) {
    if(username === '') {
        return;
    }

    const [rows] = await pool.query('SELECT * FROM comments WHERE username = ?', [username]);
    if(rows.length > 0) {
        return;
    }

    const [row] = await pool.query('INSERT INTO comments (username) VALUES (?)', [username]);
    return row;
}


module.exports = { getAllComments, addComment , addUsername, deleteAllComments};