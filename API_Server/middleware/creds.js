const allowedOrigins = require('../config/allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or Postman) or validate against the allowedOrigins list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow request
      } else {
        callback(new Error('Not allowed by CORS')); // Deny request
      }
    },
    credentials: true, // Allow credentials (cookies, auth headers)
  };

module.exports = corsOptions;