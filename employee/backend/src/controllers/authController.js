/* const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const makeToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

exports.signup = async (req, res) => {
  try {
    let { firstName, lastName, email, password, userType } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password || !userType) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    email = email.toLowerCase().trim();

    // Check if email exists
    const [exists] = await pool.query(
      'SELECT id FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    if (exists.length) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Insert user
    const [result] = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password_hash, user_type)
       VALUES (?, ?, ?, ?, ?)`,
      [firstName, lastName, email, passwordHash, userType]
    );

    const user = {
      id: result.insertId,
      firstName,
      lastName,
      email,
      userType
    };

    const token = makeToken({ id: user.id, userType: user.userType });

    res.status(201).json({ token, user });
  } catch (err) {
    console.error('SIGNUP_ERROR', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required' });

    email = email.toLowerCase().trim();

    const [rows] = await pool.query(
      'SELECT id, first_name, last_name, email, password_hash, user_type FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    if (!rows.length) return res.status(401).json({ error: 'User not found' });

    const userRow = rows[0];
    const ok = await bcrypt.compare(password, userRow.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid password' });

    const user = {
      id: userRow.id,
      firstName: userRow.first_name,
      lastName: userRow.last_name,
      email: userRow.email,
      userType: userRow.user_type
    };

    const token = jwt.sign({ id: user.id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user });
  } catch (err) {
    console.error('LOGIN_ERROR', err);
    res.status(500).json({ error: 'Server error' });
  }
}; */
