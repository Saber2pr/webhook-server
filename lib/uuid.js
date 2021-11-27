'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.readUuid = exports.updateUuid = void 0
const fs_1 = require('fs')
const path_1 = require('path')
const util_1 = require('util')
const utils_1 = require('@saber2pr/utils')
const secretPath = (0, path_1.join)(__dirname, '../secret.txt')
const updateUuid = () =>
  (0, fs_1.writeFileSync)(secretPath, utils_1.random.uuid())
exports.updateUuid = updateUuid
const readUuid = async () => {
  const buf = await (0, util_1.promisify)(fs_1.readFile)(secretPath)
  return buf.toString()
}
exports.readUuid = readUuid
