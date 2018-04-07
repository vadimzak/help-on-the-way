'use strict'
module.exports = {
    NODE_ENV: '"production"',
    ANONYMOUS_ROLE: '"ANONYMOUS"',
    SERVER_BASE_URL: '"' + (process.env.SERVER_BASE_URL || 'https://server.dorldor.org.il') + '"',
    APP_URL: '"' + (process.env.APP_URL || 'https://app.dorldor.org.il') + '"'
  }
  