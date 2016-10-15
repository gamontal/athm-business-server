'use strict';

// Load environment variables from .env
require('dotenv').config()

/* Environment Objects */
const config = {
  production: {
    port: Number(process.env.PORT || 8080),
    host: process.env.IP || '0.0.0.0',
    env: 'production'
  },
  development: {
    port: Number(process.env.PORT || 8080),
    host: process.env.IP || '0.0.0.0',
    env: 'development'
  },
  test: {}
};

module.exports = function () {
  switch (process.env.NODE_ENV) {
    case 'production': return config.production;    // production environment
    case 'development': return config.development;  // development environment
    case 'test': return config.test;                // test environment
    default: return config.development;             // node server will start en development mode by default
  }
};