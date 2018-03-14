'use strict'
module.exports = {
    NODE_ENV: '"development"',
    ANONYMOUS_ROLE: '"ANONYMOUS"', 
    SERVER_BASE_URL: '"' + (process.env.SERVER_BASE_URL || 'http://server.dev.dorldor.org.il') + '"',
    APP_URL: '"' + (process.env.APP_URL || 'http://localhost:8080') + '"'
  }