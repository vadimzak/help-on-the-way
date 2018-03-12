'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')
const sharedTestConfig = require('../../shared/config/test.config')

module.exports = merge(devEnv, sharedTestConfig)
