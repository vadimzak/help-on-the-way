'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const sharedDevConfig = require('../../shared/config/dev.config')
module.exports = merge(prodEnv, sharedDevConfig)
