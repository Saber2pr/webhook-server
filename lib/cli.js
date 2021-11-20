'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const cli_1 = __importDefault(require('@saber2pr/cli'))
const path_1 = require('path')
;(0, cli_1.default)({
  name: 'cli',
  libRoot: (0, path_1.join)(__dirname, '..'),
})
