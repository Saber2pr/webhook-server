'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const parseUrlParam_1 = require('./utils/parseUrlParam')
const child_process_1 = require('child_process')
const http_1 = require('http')
const util_1 = require('util')
const Exec = (0, util_1.promisify)(child_process_1.exec)
const server = (0, http_1.createServer)(async (req, res) => {
  try {
    const params = (0, parseUrlParam_1.parseUrlParam)(req.url)
    const command =
      (params === null || params === void 0 ? void 0 : params.command) || ''
    const args =
      (params === null || params === void 0 ? void 0 : params.args) || ''
    await Exec(`yarn cli ${command} ${args.split(',').join(' ')}`, {
      maxBuffer: 1,
    })
    res.end(JSON.stringify({ success: true }))
  } catch (error) {
    console.log(error)
    res.end(JSON.stringify({ success: false }))
  }
})
server.listen(3000, () => console.log('localhost:3000'))
