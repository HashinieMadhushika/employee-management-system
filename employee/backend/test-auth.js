// Test if auth.js can be loaded without errors
try {
  const auth = require('./src/middleware/auth');
  console.log('✅ auth.js loaded successfully!');
  console.log('Exported functions:', Object.keys(auth));
} catch (error) {
  console.error('❌ Error loading auth.js:', error.message);
}