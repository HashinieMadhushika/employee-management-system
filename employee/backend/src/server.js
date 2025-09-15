require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
//const employeeRoutes = require('./routes/employees');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3002",
  credentials: true
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running', 
    timestamp: new Date().toISOString(),
    ok: true 
  });
});

//app.use(generalLimiter);
app.use('/api/auth', authRoutes);
//app.use('/api/employees', employeeRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
