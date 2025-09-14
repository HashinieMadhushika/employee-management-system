const jwt = require('jsonwebtoken');
const db = require('../db');
const express = require('express');
const bcrypt = require('bcryptjs');

// ✅ DEFINE verifyToken function FIRST
const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const [users] = await db.execute(
      'SELECT id, email, user_type FROM users WHERE id = ?',
      [decoded.id]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = users[0];
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// ✅ THEN define requireAdmin
const requireAdmin = (req, res, next) => {
  if (req.user.user_type !== 'administrator') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// ✅ FINALLY export both functions
module.exports = {
  verifyToken,
  requireAdmin
};