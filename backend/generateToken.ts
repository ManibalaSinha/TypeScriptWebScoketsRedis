// generateToken.ts (CommonJS)
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Use the same secret as in your .env
const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';

// Sample payload (user id, role, etc.)
const payload = {
  id: '12345',
  name: 'Test User',
  email: 'test@example.com'
};

// Token options
const options = {
  expiresIn: '1h'  // token valid for 1 hour
};

// Generate JWT
const token = jwt.sign(payload, JWT_SECRET, options);
console.log('Generated JWT:', token);
