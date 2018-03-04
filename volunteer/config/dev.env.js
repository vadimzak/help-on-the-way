'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVER_BASE_URL: '"' + (process.env.SERVER_BASE_URL || 'http://localhost:5000') + '"',
  APP_URL: '"' + (process.env.APP_URL || 'http://localhost:8080') + '"'
})
